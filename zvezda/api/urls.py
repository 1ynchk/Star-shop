from django.urls import path 

from .views import ProductsView, UsersAuthorizationView, UserInfoView, ReviewView

urlpatterns = [
    path('products/', ProductsView.as_view()),
    path('products/reviews/', ReviewView.as_view()),
    path('users/', UsersAuthorizationView.as_view()),
    path('users/profile_info', UserInfoView.as_view())
]