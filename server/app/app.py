import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from api.blog_endpoint import blog_bp
from flask_jwt_extended import JWTManager


app = Flask(__name__)
origins = ["http://localhost:3000", "https://khaipi.xyz", "http://127.0.0.1:5000", "https://my-blog-subo.onrender.com"]

# PROD CONFIG
CORS(app, supports_credentials=True, origins=origins[1])

# # LOCAL CONFIG
# CORS(app, supports_credentials=True, origins=origins[0])

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(blog_bp)


# PROD CONFIG
frontend_folder = os.path.join(os.getcwd(), "../", "client")

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



if __name__ == '__main__':
    # PROD CONFIG
    app.run(host='0.0.0.0', port=5000)

    # # LOCAL CONFIG
    # app.run( port=5000, debug=True)