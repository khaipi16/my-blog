import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from api.blog_endpoint import blog_bp
from flask_jwt_extended import JWTManager


app = Flask(__name__)
origins = ["http://localhost:3000", "http://127.0.0.1:5000", "http://khai-blog-client.s3-website-us-east-1.amazonaws.com/", "https://my-blog-subo.onrender.com", "https://khaipi.com"]
CORS(app, supports_credentials=True, origins=origins[3])

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(blog_bp)

frontend_folder = os.path.join(os.getcwd(), "../", "client")
# frontend_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../frontend/build")

build_folder = os.path.join(frontend_folder, "build")

# Serve static files from 'build' folder under 'client' directory
@app.route("/", defaults={"filename":"index.html"})
@app.route("/<path:filename>")
def index(filename):
    return send_from_directory(build_folder, filename)


# Serve static assets from the 'build/static' directory
@app.route('/static/<path:folder>/<path:filename>')
def serve_static(folder, filename):
    static_folder = os.path.join(build_folder, "static", folder)
    return send_from_directory(static_folder, filename)







# import os
# from flask import Flask
# from flask_cors import CORS
# from api.blog_endpoint import blog_bp
# from flask_jwt_extended import JWTManager

# # config = {
# #     'MONGO_URI': os.getenv('MONGO_URI'),
# #     'JWT_SECRET_KEY': os.getenv('JWT_SECRET_KEY')
# # }

# app = Flask(__name__)
# CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

# app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
# jwt = JWTManager(app)

# # CORS(app, resources={r"/*": {
# #     "origins": "*",  # Be more specific in production
# #     "methods": ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
# #     "allow_headers": ["Authorization", "Content-Type"]
# # }})

# # app.config.from_object(config)


# # app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
# # app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
# # app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS') == 'True'
# # app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
# # app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')

# # mail = Mail(app)

# # Register Blueprints
# app.register_blueprint(blog_bp)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)