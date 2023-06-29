from django.urls import path

from . import views

urlpatterns = [
    path('insert', views.insertWord, name='insert'),
    path('autocomplete', views.autocomplete, name='autocomplete'),
    path('reset', views.reset, name='reset'),
]
