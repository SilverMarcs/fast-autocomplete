from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .trie import Trie
import json


@csrf_exempt
def insertWord(request):
    if request.method == "POST":
        data = json.loads(request.body)
        sentence = data.get("words")
        words = sentence.split()

        for word in words:
            Trie.Instance().insert(word.lower())

        return JsonResponse({"status": "insertWord success"}, status=200)


@csrf_exempt
def autocomplete(request):
    if request.method == "POST":
        data = json.loads(request.body)
        prompt = data.get("prompt")

        result = Trie.Instance().autocomplete(prompt)

        return JsonResponse({"result": result}, status=200)


@csrf_exempt
def reset(request):
    if request.method == "POST":
        trie = Trie.Instance()
        trie.reset()

        return JsonResponse({"status": "Trie reset successful"})
