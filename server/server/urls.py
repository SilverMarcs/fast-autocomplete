from django.contrib import admin
from django.urls import path
from django.urls import include
from .views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('insert', insertWord, name='insert'),
    path('autocomplete', autocomplete, name='autocomplete'),
    path('reset', reset, name='reset'),
]
