from django.urls import path 

from .views import ProductsView, UsersAuthorizationView

urlpatterns = [
    path('products/', ProductsView.as_view()),
    path('users/', UsersAuthorizationView.as_view())
]