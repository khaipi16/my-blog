"""
WSGI config for the Flask application.

This script serves as the entry point for WSGI-compatible web servers
to serve your Flask application. It imports the 'app' instance from
the 'app.py' file located in the 'backend/app' directory and exposes
it as a module-level variable named 'app'.

To run the application using a WSGI server like Gunicorn or uWSGI,
point the server to this file, e.g., using the command:
    gunicorn -w 4 -b 0.0.0.0:5000 wsgi:app

For more information on deploying Flask applications with WSGI servers,
refer to the Flask deployment documentation.
"""
import os
import sys


# Add the app directory to the Python path
app_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'app'))
sys.path.insert(0, app_path)

print(f"Python path: {sys.path}")  # Debugging print to check the path
from app import app

if __name__ == "__main__":
    app.run()