import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from api.blog_endpoint import blog_bp
from flask_jwt_extended import JWTManager


app = Flask(__name__)
origins = ["http://localhost:3000", "http://khai-blog-client.s3-website-us-east-1.amazonaws.com/", "https://my-blog-subo.onrender.com", "https://khaipi.com"]
CORS(app, supports_credentials=True, origins=origins)

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



if __name__ == '__main__':
    app.run(port=5000, debug=True)
