from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Products
from .serializer import ProductsSerializer, ExactProductSerializer

# Create your views here.
class ProductsView(APIView):

    def get(self, request):
        if request.headers['type-query-product'] == 'exact':
            articul = request.headers['articul']
            obj = Products.objects.get(articul=articul)

            return Response({'data': ExactProductSerializer(obj).data})
        else:

            query_set = Products.objects.all()
            return Response({"data": ProductsSerializer(query_set, many=True).data})
        