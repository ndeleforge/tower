import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from waitress import serve
from routes import routes

# ------------------ Configuration ------------------

APP_VERSION = "2025.09"
APP_ENV = os.getenv("APP_ENV", "dev")

if APP_ENV == "production":
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    FRONTEND_DIR = os.path.join(BASE_DIR, "frontend") 
else:
    FRONTEND_DIR = "../frontend";

# ------------------ Flask ------------------

app = Flask(__name__, static_folder=FRONTEND_DIR)
app.register_blueprint(routes)
CORS(app)

# ------------------ Main ------------------

if __name__ == "__main__":
    if APP_ENV == "production":
        serve(app, host="0.0.0.0", port=5000)
    else:
        app.run(debug=True, port=5001)
