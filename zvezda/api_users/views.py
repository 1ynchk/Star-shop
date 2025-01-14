from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Users, Cart, Favourite
# Create your views here.

from .serializer import GetUsersProfileInfo, CartSerializer

# АУТЕНТИФИКАЦИЯ #

@api_view(http_method_names=['GET'])
def check_is_authenticated(request):
    '''Проверка, аутентифицирован пользователь или нет'''
    
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

@api_view(http_method_names=['POST'])
def user_registration(request):
    '''Регистрация пользователя'''

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

@api_view(http_method_names=['POST'])
def user_login(request):
    '''Авторизация пользователя'''

    email = request.data.get('email')         
    password = request.data.get('password')
    user = authenticate(request=request, email=email, password=password)
    if user is not None:
        login(request, user)
        return Response({'status': 'ok'}, status=status.HTTP_202_ACCEPTED)
    else:
        return Response({'status': 'error', 'comment': 'there is not such an user'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(http_method_names=['POST'])
def user_logout(request):
    '''Выход из аккаунта пользователя'''

    logout(request)
    response = Response({'status': 'ok'})
    response.delete_cookie('UID')
    return response

# ПРОФИЛЬ #

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
        
# КОРЗИНА #

@api_view(http_method_names=['GET'])
def get_user_cart(request):
    queryset = Cart.objects.filter(user_id=request.user.id)

    return Response({'status': 'ok', 'data': CartSerializer(queryset, many=True).data}) 