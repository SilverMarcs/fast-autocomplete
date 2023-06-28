from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def insertWord(request):
    if request.method == 'POST':
        word = request.POST.get('words')
        # Perform your processing here
        return JsonResponse({'status': 'insertWord success'}, status=200)


@csrf_exempt
def autocomplete(request):
    if request.method == 'POST':
        word = request.POST.get('word')
        # Perform your processing here
        return JsonResponse({'result': 'autocomplete success'}, status=200)
