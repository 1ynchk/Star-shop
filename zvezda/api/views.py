from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from rest_framework.pagination import PageNumberPagination

from .models import Products, Users, UsersRate, ProductRate, ReviewRate
from .serializer import (
    ProductsSerializer, 
    ExactProductSerializer,
    UsersRateSerializer,
    GetUsersProfileInfo,
    ReviewRateSerializer,
    ExactProductSerializerLoggined
    )

class ExactProductReviewsPagination(PageNumberPagination):
    page_size = 3 
    page_size_query_param = 'page_size'
    max_page_size = 10000

# Create your views here.
class ProductsView(APIView):

    def get(self, request):
        
        if request.headers['type-query-product'] == 'exact':
            articul = request.headers['articul']
            user_id = request.user.id
            obj = Products.objects.get(articul=articul)
            if user_id is not None:
                response = Response({'data': ExactProductSerializerLoggined(obj, context={'user_id': user_id}).data}) 
            else:
                response = Response({'data': ExactProductSerializer(obj).data})
            print(ExactProductSerializerLoggined(obj, context={'user_id': user_id}).data)
            response['Cache-Control'] = 'no-store'
            return response
        
        if request.headers['type-query-product'] == 'main-page':
            query_set = Products.objects.all()

            response = Response({"data": ProductsSerializer(query_set, many=True).data})
            response['Cache-Control'] = 'no-store'
            
            return response
        
    def post(self, request):
        
        if request.headers['type-post'] == 'assessment':
            id_ = request.data.get('id')
            assessment = request.data.get('assessment')
            data = {'user_rate': assessment, 'product': id_, 'user': request.user.id}
            try:
                instance = UsersRate.objects.get(user=request.user.id, product=id_)
                serializer = UsersRateSerializer(data=data, instance=instance)
            except Exception:
                serializer = UsersRateSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response({'status': 'ok'})
            else:
                return Response({'status': 'error', 'comment': 'incorrect data'}, status=status.HTTP_400_BAD_REQUEST)
            

        if request.headers['type-post'] == 'getAssessment':
            id_ = request.data.get('id')
            try:
                obj = UsersRate.objects.get(product=id_, user=request.user.id)
                rate = obj.user_rate
            except Exception:
                rate = None
                response = Response({'status': 'ok', 'data': rate})
                response['Cache-Control'] = 'no-store'
                return response
            else:
                response = Response({'status': 'ok', 'data': rate})
                response['Cache-Control'] = 'no-store'
                return response

class ReviewView(APIView):

    def get(self, request):
        return Response({'status': 'ok'})

    def post(self, request):
        id_user = request.user.id
        id_review = request.data.get('id_review')
        id_product = request.data.get('id_product')
        assessment = request.data.get('assessment')
        print(assessment)
        data = {'assessment': assessment, 'product': id_product, 'review': id_review, 'user': id_user}
        try:
            instance = ReviewRate.objects.get(user_id=id_user, product_id=id_product, review_id=id_review)
            serializer = ReviewRateSerializer(data=data, instance=instance)
        except Exception:
            serializer = ReviewRateSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'ok'})
        else:
            return Response({'status': 'error', 'comment': 'incorrect data'}, status=status.HTTP_400_BAD_REQUEST)
        
class UsersAuthorizationView(APIView):

    def get(self, request):
        if request.user.is_authenticated:
            user = Users.objects.get(id=request.user.id)
            return Response({'authenticated': True, 'avatar': user.avatar})
        else:
            return Response({'authenticated': False})
            
    def post(self, request):

        if request.headers['type-post'] == 'register':
            email = request.data.get('email')
            password = request.data.get('password')
            try:
                obj = Users.objects.get(email=email)
            except Exception:
                user = Users(email=email)
                user.set_password(password)
                user.save()
                return Response({'status': 'ok'}, status=status.HTTP_202_ACCEPTED)
            if obj is not None:
                return Response({'status': 'error', 'comment': 'incorrect data'}, status=status.HTTP_400_BAD_REQUEST)
        
        if request.headers['type-post'] == 'login':
            email = request.data.get('email')         
            password = request.data.get('password')
            user = authenticate(request=request, email=email, password=password)
            if user is not None:
                login(request, user)

                return Response({'status': 'ok'}, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({'status': 'error', 'comment': 'there is not such an user'}, status=status.HTTP_401_UNAUTHORIZED)

        if request.headers['type-post'] == 'logout':
            logout(request)
            return Response({'status': 'ok'})

class UserInfoView(APIView):

    def post(self, request):
        pk = request.user.id
        try:
            instance = Users.objects.get(id=pk)
        except Exception:
            return Response({'status': 'error', 'comment': 'there is not such a user'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = GetUsersProfileInfo(data=request.data, instance=instance)
            if not serializer.is_valid():
                return Response({'status': 'error', 'comment': 'incorrect data'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
            else:
                serializer.save()
                return Response({'status': 'ok', 'data': serializer.data})
            
    def get(self, request):
        pk = request.user.id
        try:
            obj = Users.objects.get(id=pk)
        except Exception:
            return Response({'status': 'error', 'comment': 'there is not such a user'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = GetUsersProfileInfo(obj)
            return Response({'status': 'ok', 'data': serializer.data})