import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from waitress import serve
from routes import routes

# Initialization

load_dotenv() 
APP_ENV = os.getenv("APP_ENV")

# Data

APP_VERSION = "2025.10.02"
STATIC_FOLDER = "frontend"

# Flask application

app = Flask(__name__, static_folder=STATIC_FOLDER)
app.register_blueprint(routes)
CORS(app)

# Run the application 

if __name__ == "__main__":
    if APP_ENV == "prod":
        serve(app, host="0.0.0.0", port=5000)
    else:
        app.run(debug=True, port=5000)
