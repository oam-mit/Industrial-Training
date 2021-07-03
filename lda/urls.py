from django.urls import path, include

from . import views

app_name = "lda"

urlpatterns = [
    path('', views.home, name="home"),
    path('api/predict', views.predict, name="api_predict"),
]
