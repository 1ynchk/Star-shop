from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from rest_framework.decorators import api_view

from .models import Products, Users, UsersRate, ReviewRate, UserReview
from .serializer import (
    ProductsSerializer, 
    UsersRateSerializer,
    GetUsersProfileInfo,
    ReviewRateSerializer,
    UserReviewCreate,
    UserReviewSerializer,
    RefactoredExactProduct,
    RefactoredExactProductReviews,
    )

from django.db import connection

''' ПРОДУКТ '''

@api_view(http_method_names=['GET'])
def get_exact_product(request):
    '''Получение информации об определенном продукте'''
    
    articul = request.headers['articul']
    user_id = request.user.id

    obj = Products.objects \
        .select_related('category', 'discount') \
        .prefetch_related('rate') \
        .get(articul=articul)
    reviews = obj.reviews.select_related('user_id').all()

    if user_id is not None:
        assessments = ReviewRate.objects.filter(product=obj.id, user=user_id)
        if assessments:
            assessments = ReviewRateSerializer(assessments, many=True).data
        response = Response({
            'data': RefactoredExactProduct(obj).data, 
            'reviews': RefactoredExactProductReviews(reviews, many=True).data,
            'assessments': assessments
        },)

    else:
        response = Response({
            'data': RefactoredExactProduct(obj).data, 
            'reviews': RefactoredExactProductReviews(reviews, many=True).data,
        },)

    response['Cache-Control'] = 'no-store'
    return response

@api_view(http_method_names=['GET'])
def get_main_page_products(request):
    '''Получение продуктов для главной страницы'''

    query_set = Products.objects.select_related('discount').all()
    response = Response({"data": ProductsSerializer(query_set, many=True).data})
    response['Cache-Control'] = 'no-store'
            
    return response

@api_view(http_method_names=['GET'])
def get_exact_product_assessment(request):
    '''Получение оценки пользователя'''

    pk = request.query_params.get('id')

    try:
        obj = Products.objects.prefetch_related('rate').get(id=pk)
        obj_rate = obj.rate.get(user=request.user.id)
        rate = obj_rate.user_rate
    except Exception:
        rate = None
        response = Response({'status': 'ok', 'data': rate})
        response['Cache-Control'] = 'no-store'
        return response
    else:
        response = Response({'status': 'ok', 'data': rate})
        response['Cache-Control'] = 'no-store'
        return response

@api_view(http_method_names=['POST'])
def post_product_assessment(request):
    '''Пост оценки продукта'''

    pk = request.data.get('id')
    assessment = request.data.get('assessment')
    data = {'user_rate': assessment, 'user': request.user.id}

    try:
        obj = Products.objects.prefetch_related('rate').get(id=pk)
        rate = obj.rate.get(user=request.user.id)
        serializer = UsersRateSerializer(data=data, instance=rate)
    except Exception:
        serializer = UsersRateSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({'status': 'ok'})
    else:
        return Response({'status': 'error', 'comment': 'incorrect data'}, status=status.HTTP_400_BAD_REQUEST)

class ReviewRateView(APIView):

    def post(self, request):
        id_user = request.user.id
        id_review = request.data.get('id_review')
        id_product = request.data.get('id_product')
        assessment = request.data.get('assessment')
        data = {'assessment': assessment, 'product': id_product, 'review': id_review, 'user': id_user}
        try:
            obj = ReviewRate.objects.get(user_id=id_user, product_id=id_product, review_id=id_review)
            serializer = ReviewRateSerializer(data=data, instance=obj)
        except Exception:
            serializer = ReviewRateSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'ok'})
        else:
            return Response({'status': 'error', 'comment': 'incorrect data'}, status=status.HTTP_400_BAD_REQUEST)
    
class ReviewView(APIView):

    def post(self, request):
        
        value = request.data.get('value')
        product_id = request.data.get('product_id')
        user = request.user

        try:
            obj = Products.objects.get(id=product_id)
        except Exception:
            return Response({'status': 'error', 'comment': 'there is not such a product'}, status=status.HTTP_404_NOT_FOUND)
        else:
            instance = obj.reviews.select_related('user_id').filter(user_id_id=user, products=obj.id)
            if instance:
                return Response({'status': 'error', 
                                 'comment': 'there is already a review from this user'}, status=status.HTTP_406_NOT_ACCEPTABLE)
            else:
                instance = UserReview.objects.create(user_id=user, value=value)
                data = UserReviewSerializer(instance).data
                obj.reviews.add(instance)
                return Response({'status': 'ok', 'data': data})
                
    def delete(self, request): 
        product_id = request.data.get('product_id')
        review_id = request.data.get('review_id')
        try:
            obj = Products.objects.get(id=product_id)
            review = obj.reviews.get(id=review_id)
        except Exception:
            return Response({'status': 'error', 'comment': 'there is not such a row'}, status=status.HTTP_404_NOT_FOUND)
        else:
            data = UserReviewCreate(review).data
            review.delete()
            return Response({'status': 'ok', 'data': data})
        
class UsersAuthorizationView(APIView):

    def get(self, request):
        if request.user.is_authenticated:
            user = Users.objects.get(id=request.user.id)
            response = Response({'authenticated': True, 'avatar': user.avatar})
            response.set_cookie(
                key='UID',
                value=user.id,
                samesite='strict'
            )
            return response
        else:
            return Response({'authenticated': False})
            
    def post(self, request):

        if request.headers['type-post'] == 'register':
            email = request.data.get('email')
            password = request.data.get('password')
            
            try:
                obj = Users.objects.get(email=email)
            except Exception:
                name = request.data.get('name')
                surname = request.data.get('surname')
                
                user = Users(email=email)
                user.set_password(password)
                user.last_name = surname
                user.first_name = name
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
            response = Response({'status': 'ok'})
            response.delete_cookie('UID')
            return response

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