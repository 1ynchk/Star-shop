
from rest_framework.response import Response
from rest_framework import status 
from rest_framework.decorators import api_view

from .models import Products, UsersRate, ReviewRate, UserReview
from .serializer import (
    ProductsSerializer, 
    UsersRateSerializer,
    ReviewRateSerializer,
    UserReviewCreate,
    UserReviewSerializer,
    RefactoredExactProduct,
    RefactoredExactProductReviews,
    )

from .queries import (get_raw_product_rate, add_raw_product_rate_mtm)

from django.db import connection

def my_decorator(func):

    def inner(request, *args, **kwargs):
        connection.queries.clear()
        response = func(request, *args, **kwargs)
        print(func.__name__, len(connection.queries))

        return response
    
    return inner
    
''' ПРОДУКТ '''

@api_view(http_method_names=['GET'])
@my_decorator
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
@my_decorator
def get_main_page_products(request):
    '''Получение продуктов для главной страницы'''

    query_set = Products.objects.select_related('discount').all()
    response = Response({"data": ProductsSerializer(query_set, many=True).data})
    response['Cache-Control'] = 'no-store'
            
    return response

@api_view(http_method_names=['GET'])
@my_decorator
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
@my_decorator
def post_product_assessment(request):
    '''Пост оценки продукта'''

    pk = request.data.get('id')
    assessment = request.data.get('assessment')
    data = {'user_rate': assessment, 'user': request.user.id}

    try:
        rate = get_raw_product_rate(pk, request.user.id)
        serializer = UsersRateSerializer(data=data, instance=rate)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'ok'})
        else:
            return Response({'status': 'error', 'comment': 'incorrect data'}, status=400)

    except Exception:
        instance = UsersRate.objects.create(user=request.user, user_rate=assessment)
        add_raw_product_rate_mtm(pk, instance.id)
        return Response({'status': 'ok'})

@api_view(http_method_names=['POST'])
@my_decorator
def post_review_assessment(request):
    '''Добавление/обновление оценки отзыва'''

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
        return Response({'status': 'error', 'comment': 'incorrect data'}, status=400)

@api_view(http_method_names=['POST'])
@my_decorator
def post_add_new_review(request):
    '''Добавление нового отзыва'''

    value = request.data.get('value')
    product_id = request.data.get('product_id')
    user = request.user
    try:
        obj = Products.objects.get(id=product_id)
    except Exception:
        return Response({'status': 'error', 'comment': 'there is not such a product'}, status=404)
    else:
        instance = obj.reviews.select_related('user_id').filter(user_id_id=user, products=obj.id)
        if instance:
            return Response({'status': 'error', 
                             'comment': 'there is already a review from this user'}, status=406)
        else:
            instance = UserReview.objects.create(user_id=user, value=value)
            data = UserReviewSerializer(instance).data
            obj.reviews.add(instance)
            return Response({'status': 'ok', 'data': data})

@api_view(http_method_names=['DELETE'])
@my_decorator
def delete_delete_review(request):
    '''Удаление отзыва'''
    
    product_id = request.data.get('product_id')
    review_id = request.data.get('review_id')
    try:
        obj = Products.objects.get(id=product_id)
        review = obj.reviews.get(id=review_id)
    except Exception:
        return Response({'status': 'error', 'comment': 'there is not such a row'}, status=404)
    else:
        data = UserReviewCreate(review).data
        review.delete()
        return Response({'status': 'ok', 'data': data})

@api_view(http_method_names=['PUT'])
def update_user_review(request):
    '''Обновление отзыва'''

    value = request.query_params.get('value')
    review_id = request.query_params.get('review_id')
    user_id = request.user.id

    print(review_id, user_id)

    try:
        obj = UserReview.objects.get(user_id=user_id, id=review_id)
    except Exception:
        return Response({'status': 'error', 'comment': 'there is not such a review'}, status=404)
    
    obj.value = value
    obj.save()
    return Response({'status': 'ok', 'data': UserReviewSerializer(obj).data})