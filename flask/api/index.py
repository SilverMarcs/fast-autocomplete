from flask import Flask, request, jsonify
from flask_cors import CORS

from .trie import Trie
import json


app = Flask(__name__)
cors = CORS(app)


@app.route("/insert", methods=["POST"])
def insert_word():
    data = json.loads(request.data)
    sentence = data.get("words")
    words = sentence.split()

    for word in words:
        Trie.Instance().insert(word.lower())

    return jsonify({"status": "insertWord success"}), 200


@app.route("/autocomplete", methods=["POST"])
def autocomplete():
    data = json.loads(request.data)
    prompt = data.get("prompt")

    result = Trie.Instance().autocomplete(prompt)

    return jsonify({"result": result}), 200


@app.route("/reset", methods=["POST"])
def reset():
    trie = Trie.Instance()
    trie.reset()

    return jsonify({"status": "Trie reset successful"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=3002)
