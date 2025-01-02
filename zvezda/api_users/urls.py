from django.urls import path 

from .views import (
    UserInfoView,
    check_is_authenticated,
    user_registration,
    user_login,
    user_logout,
)

urlpatterns = [
    path('users/check-authenticated/', check_is_authenticated),
    path('users/registration/', user_registration),
    path('users/login/', user_login),
    path('users/logout/', user_logout),
    path('users/profile_info', UserInfoView.as_view())
]   