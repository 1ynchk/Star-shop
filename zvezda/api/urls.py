from django.urls import path 

from .views import (
    UsersAuthorizationView, 
    UserInfoView, 
    ReviewRateView,
    ReviewView,

    get_exact_product,
    get_main_page_products,
    post_product_assessment,
    get_exact_product_assessment
    )

urlpatterns = [
    path('products/main-page/', get_main_page_products),
    path('products/exact-product/', get_exact_product),
    path('products/post-assessment/', post_product_assessment),
    path('products/get-assessment/', get_exact_product_assessment),
    path('products/reviews/assessment/', ReviewRateView.as_view()),
    path('products/reviews/', ReviewView.as_view()),
    path('users/', UsersAuthorizationView.as_view()),
    path('users/profile_info', UserInfoView.as_view())
]