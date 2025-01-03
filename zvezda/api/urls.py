from django.urls import path 

from .views import (
    get_exact_product,
    get_main_page_products,
    post_product_assessment,
    get_exact_product_assessment,
    post_review_assessment,
    post_add_new_review,
    delete_delete_review,
    update_user_review
    )

urlpatterns = [
    path('products/main-page/', get_main_page_products),
    path('products/exact-product/', get_exact_product),
    path('products/post-assessment/', post_product_assessment),
    path('products/get-assessment/', get_exact_product_assessment),
    path('products/reviews/assessment/', post_review_assessment),
    path('products/reviews/add-review/', post_add_new_review),
    path('products/reviews/delete-review/', delete_delete_review),
    path('products/reviews/update-review/', update_user_review)
]