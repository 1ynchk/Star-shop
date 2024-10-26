from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Products
from .serializer import ProductsSerializer

# Create your views here.
class ProductsView(APIView):

    def get(self, request):
        query_set = Products.objects.all()

        return Response({"data": ProductsSerializer(query_set, many=True).data})
    