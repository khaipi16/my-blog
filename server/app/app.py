import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from api.blog_endpoint import blog_bp
from flask_jwt_extended import JWTManager

# config = {
#     'MONGO_URI': os.getenv('MONGO_URI'),
#     'JWT_SECRET_KEY': os.getenv('JWT_SECRET_KEY')
# }

app = Flask(__name__)
origins = ["http://localhost:3000", "http://khai-blog-client.s3-website-us-east-1.amazonaws.com/"]
# CORS(app, supports_credentials=True, origins=origins[0])
CORS(app)


app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(blog_bp)

frontend_folder = os.path.join(os.getcwd(), "../", "client")
print("frontend_folder: ", frontend_folder)
build_folder = os.path.join(frontend_folder, "build")
print("build_folder: ", build_folder)

# Serve static files from 'build' folder under 'client' directory
@app.route("/", defaults={"filename":"index.html"})
@app.route("/<path:filename>")
def index(filename):
    return send_from_directory(build_folder, filename)

# print("static_folder: ", static_folder)

# Serve static assets from the 'build/static' directory
@app.route('/static/<path:folder>/<path:filename>')
def serve_static(folder, filename):
    static_folder = os.path.join(build_folder, "static", folder)
    print("static_folder: ", static_folder)

    return send_from_directory(static_folder, filename)




if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)