import os
from core import load_json_file
from flask import Blueprint, current_app, send_from_directory, jsonify

routes = Blueprint("routes", __name__)


@routes.route("/", defaults={"path": ""})
@routes.route("/<path:path>")
def serve_front(path):
    static_folder = current_app.static_folder
    file_path = os.path.join(static_folder, path)
    if path != "" and os.path.exists(file_path):
        return send_from_directory(static_folder, path)
    else:
        return send_from_directory(static_folder, "index.html")
    

@routes.route("/api/version", methods=["GET"])
def get_version():
    from app import APP_VERSION
    return jsonify({"version": APP_VERSION})


@routes.route("/api/locale/<lang>", methods=["GET"])
def get_translation(lang):
    locales_dir = os.path.join(os.path.dirname(__file__), "locales")
    return load_json_file(locales_dir, f"{lang}.json", "Language not found")


@routes.route("/api/state", methods=["GET"])
def get_state():
    src_dir = os.path.join(os.path.dirname(__file__), "src")
    return load_json_file(src_dir, "state.json", "State not found")


@routes.route("/api/settings", methods=["GET"])
def get_settings():
    src_dir = os.path.join(os.path.dirname(__file__), "src")
    return load_json_file(src_dir, "settings.json", "Settings not found")