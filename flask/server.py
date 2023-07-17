from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

from trie import Trie
import json

# app = Flask(__name__)
# CORS_ALLOW_ORIGIN = "*,*"
# CORS_EXPOSE_HEADERS = "*,*"
# CORS_ALLOW_HEADERS = "content-type,*"
# cors = CORS(
#     app,
#     origins=CORS_ALLOW_ORIGIN.split(","),
#     allow_headers=CORS_ALLOW_HEADERS.split(","),
#     expose_headers=CORS_EXPOSE_HEADERS.split(","),
#     supports_credentials=True,
# )


app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/insert", methods=["OPTIONS"])
@cross_origin()
def handle_options():
    response = jsonify({"status": "OK"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Methods", "POST")
    return response


@app.route("/insert", methods=["POST"])
@cross_origin()
def insert_word():
    data = json.loads(request.data)
    sentence = data.get("words")
    words = sentence.split()

    for word in words:
        Trie.Instance().insert(word.lower())

    return jsonify({"status": "insertWord success"}), 200


@app.route("/autocomplete", methods=["POST"])
@cross_origin()
def autocomplete():
    data = json.loads(request.data)
    prompt = data.get("prompt")

    result = Trie.Instance().autocomplete(prompt)

    return jsonify({"result": result}), 200


@app.route("/reset", methods=["POST"])
@cross_origin()
def reset():
    trie = Trie.Instance()
    trie.reset()

    return jsonify({"status": "Trie reset successful"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=3002)
