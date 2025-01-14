from django.urls import path 

from .views import index

urlpatterns = [
    path('', index),
    path('products/<int:id>/', index),
    path('profile/settings', index),
    path('catalog/', index)
]