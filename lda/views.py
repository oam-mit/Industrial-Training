from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .utils import LDAModel
# Create your views here.


def home(request):
    return render(request, 'lda/home.html')


@api_view(['POST'])
def predict(request):
    context = {}
    model = LDAModel()
    prediction = model.predict(request.data.get('input'))
    context['status'] = 'successful'
    context['prediction'] = prediction

    return Response(context)
