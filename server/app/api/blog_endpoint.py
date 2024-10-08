import os
import json
import uuid
from datetime import datetime
from bson import json_util
from flask import Blueprint, make_response, request, jsonify
from flask_mail import Mail, Message
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from models.blog import Blog
from models.user import User
from service.blog_service import BlogService


class BlogAPI:

    def __init__(self, bp_name, import_name):

        # Instantiate BlogService
        # Dependency Injection: Instantiate BlogService to manage all blog-related data operations.
        # This approach allows us to separate concerns by delegating database operations to a dedicated service,
        # making the `BlogAPI` class more modular and testable. `BlogService` can be easily mocked or replaced
        # in tests without altering the logic of `BlogAPI`.
        self.blog_service = BlogService()

        self.bp = Blueprint(bp_name, import_name)
        # self.bp.add_url_rule('/', view_func=self.home, methods=['GET'])
        self.bp.add_url_rule('/write', view_func=self.write, methods=['POST'])
        self.bp.add_url_rule('/blogs', view_func=self.get_all_blogs, methods=['GET'])
        self.bp.add_url_rule('/blogs/<id>', view_func=self.get_blog, methods=['GET'])
        self.bp.add_url_rule('/blogs/latest', view_func=self.get_latest_blog, methods=['GET'])
        self.bp.add_url_rule('/update/<id>', view_func=self.update_blog, methods=['PUT'])
        self.bp.add_url_rule('/delete/<id>', view_func=self.delete_blog, methods=['DELETE'])
        self.bp.add_url_rule('/register', view_func=self.register, methods=['POST'])
        self.bp.add_url_rule('/login', view_func=self.login, methods=['POST'])




    def response_format(self, data=None, error=None, message=""):
        return {'Response': message, 'Data': data, 'Error': error}


    def format_blog_post(self, blog):
        # Convert MongoDB BSON to standard JSON format
        if '_id' in blog:
            blog['_id'] = str(blog['_id'])

        # Convert MongoDB datetime to ISO format string if it's not already formatted
        if 'date' in blog and isinstance(blog['date'], datetime):
            blog['date'] = blog['date'].isoformat()

        return blog
    


    # @staticmethod
    # def home():
    #     return 'Hello World!'


    @jwt_required()
    def write(self):

        current_user = get_jwt_identity()
        if not current_user:
            return jsonify(self.response_format(error="Unauthorized", message="User must be logged in to post.")), 401
        
        # Fetch current user from db using UUID
        current_user_id = str(current_user['user_id'])
        user = self.blog_service.get_user_by_id(current_user_id)
        
        if not user:
            return jsonify(self.response_format(error="Unauthorized", message="User not found")), 404
        
        # Check if user has reached their upload limit
        if not user.get('is_admin') and user.get('max_blogs') is not None:
            blog_count = self.blog_service.user_uploads_count(current_user_id)
            if blog_count > user.get('max_blogs'):
                return jsonify(self.response_format(error="Upload limit reached", message="You have reached your upload limit.")), 403
        
        request_data = request.get_json()
        title = request_data.get('title')
        author = request_data.get('author')
        category = request_data.get('category')
        content = request_data.get('content')

        if not all([title, author, category, content]):
            return jsonify(self.response_format(error="Missing data", message="All fields are required")), 400

        try:
            blog_post = Blog(current_user_id, title, author, category, content)
            blog_id = self.blog_service.save_to_db(blog_post)
            return jsonify(self.response_format(data={"id": blog_id}, message="Successfully posted a blog")), 201
        except Exception as ex:
            return jsonify(self.response_format(error=str(ex), message="Failed to post blog")), 500



    def get_all_blogs(self):
        try:
            blogs = self.blog_service.get_all()
            # Format each blog post
            formatted_blogs = [self.format_blog_post(blog) for blog in blogs]
            # Convert the list of formatted blog posts to JSON
            blogs_json = json_util.dumps(formatted_blogs)
            return jsonify(self.response_format(data=json.loads(blogs_json), message="Successfully retrieved all blogs")), 200
        except Exception as ex:
            return jsonify(self.response_format(error=str(ex), message="Failed to retrieve blogs")), 500



    def get_blog(self, id):
        try:
            blog = self.blog_service.get_by_id(id)
            if blog:
                return jsonify(self.response_format(data=blog, message="Successfully retrieved blog")), 200
            else:
                return jsonify(self.response_format(error="Blog not found")), 404
        except Exception as ex:
            return jsonify(self.response_format(error=str(ex), message="Failed to retrieve blog")), 500
        


    def get_latest_blog(self):
        try:
            latest_blog = self.blog_service.get_latest_blog()
            latest_blog['_id'] = str(latest_blog['_id'])
            if latest_blog:
                return jsonify(self.response_format(data=latest_blog, message="Successfully retrieved all blogs")), 200
            else:
                return jsonify(self.response_format(error="Blog not found")), 404
        except Exception as ex:
            return jsonify(self.response_format(error=str(ex), message="Failed to retrieve blogs")), 500


    @jwt_required() 
    def update_blog(self, id):
        current_user = get_jwt_identity()

        # Ensures only the correct user can edit their associcated blog
        blog = self.blog_service.get_by_id(id)
        if not blog:
            return jsonify(self.response_format(error="Blog not found", message="The selected blog is not found"))
        
        current_user_id = str(current_user['user_id'])
        user = self.blog_service.get_user_by_id(current_user_id)
        blog_user_id = blog.get('user_id')
        is_admin = user.get('is_admin', False)

        if blog_user_id != current_user_id and not is_admin:
            return jsonify(self.response_format(error="Unauthorized to edit this blog", message="You are not authorized to edit this blog")), 403
        try:
            updated_blog = request.get_json()

            # Removes '_id' from the payload to ensure blog object _id is not updated since it must be unique
            if '_id' in updated_blog:
                del updated_blog['_id']

            # Update the blog and return the updated document
            updated_blog = self.blog_service.update_blog(id, updated_blog)

            if updated_blog:
                # Return the updated document in the response
                updated_blog['_id'] = str(updated_blog['_id'])
                return jsonify(self.response_format(data=updated_blog, message="Successfully updated blog")), 200
            else:
                return jsonify(self.response_format(error="Failed to update blog")), 400
        except Exception as ex:
            return jsonify(self.response_format(error=str(ex), message="Failed to update blog")), 500


    @jwt_required()
    def delete_blog(self, id):
        current_user = get_jwt_identity()
        if not current_user:
            return jsonify(self.response_format(error="Unauthorized", message="You are not authorized to delete.")), 401
        
        # Ensures only the correct user can delete their associcated blog
        blog = self.blog_service.get_by_id(id)
        if not blog:
            return jsonify(self.response_format(error="Blog not found", message="The selected blog is not found"))
        
        current_user_id = str(current_user['user_id'])
        user = self.blog_service.get_user_by_id(current_user_id)
        blog_user_id = blog.get('user_id')
        is_admin = user.get('is_admin', False)

        if blog_user_id != current_user_id and not is_admin:
            return jsonify(self.response_format(error="Unauthorized to delete", message="You are not authorized to delete this blog")), 403
        
        try:
            success = self.blog_service.delete_blog(id)
            if success:
                return jsonify(self.response_format(message="Successfully deleted blog")), 200
            else:
                return jsonify(self.response_format(error="Failed to delete blog")), 404
        except Exception as ex:
            return jsonify(self.response_format(error=str(ex), message="Failed to delete blog")), 500
        

    
    def register(self):
        request_data = request.get_json()
        
        required_fields = ['firstName', 'lastName', 'dob', 'email', 'password']
        missing_fields = [field for field in required_fields if not field in request_data]
        if missing_fields:
            return jsonify(self.response_format(error="Missing data", message={"missing field":missing_fields})), 400

        # Generate unique UUID serving as unique user_id
        user_id = str(uuid.uuid4())
        first_name = request_data.get('firstName')
        last_name = request_data.get('lastName')
        dob = datetime.strptime(request_data.get('dob'), "%Y-%m-%d")
        email = request_data.get('email')
        hashed_password = generate_password_hash(request_data.get('password'), method='sha256')
        
        # # Ensure email is unique
        existing_user = self.blog_service.users_collection.find_one({"email": email})
        if existing_user:
            return jsonify(self.response_format(error="Duplicate email", message="That email already exists!")), 409
        
        try:
            # Grant admin rights to specified email
            is_admin = email == os.getenv("ADMIN_EMAIL")
            new_user = User(
                user_id=user_id,
                is_admin=is_admin,
                first_name=first_name, 
                last_name=last_name, 
                dob=dob, 
                email=email, 
                password=hashed_password,
                max_blogs = 5 if not is_admin else None
            )

            user_id = self.blog_service.save_user(new_user)
            return jsonify(self.response_format(data={"id": user_id}, message="Successfully registered!")), 201
        except Exception as ex:
            return jsonify({'error': str(ex), 'message': 'Failed to register'}), 500
        


    def login(self):
        request_data = request.get_json()
        
        username = request_data.get('username')
        password = request_data.get('password')

        user = self.blog_service.users_collection.find_one({"email": username})
        user_id = str(user['user_id'])
        try:
            if user and check_password_hash(user['password'], password):
                access_token = create_access_token(identity={"user_id": user_id, "email":username})
                return jsonify(self.response_format(data={"access_token": access_token, "user_info": username})), 200
            else:
                return jsonify(self.response_format(error="Invalid usernmae or password")), 401
        except Exception as ex:
            return jsonify(self.response_format(error=str(ex), message="Error trying to login")), 500

    
blog_api = BlogAPI('blog', __name__)
blog_bp = blog_api.bp
