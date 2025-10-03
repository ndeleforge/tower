import os
import json
from flask import jsonify, make_response

def load_json(directory, filename, not_found_msg):
    file_path = os.path.join(directory, filename)
    if not os.path.exists(file_path):
        return jsonify({"error": not_found_msg}), 404
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return make_response(jsonify(data))
