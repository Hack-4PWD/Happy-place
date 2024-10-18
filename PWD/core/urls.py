from django.urls import path
from .views import (
    RegisterAPIView, LoginAPIView, UserAPIView, RefreshAPIView,
    LogoutAPIView, ForgotAPIView, ResetAPIView, AllUsersAPIView, UserDeleteAPIView
)

urlpatterns = [
    path('register', RegisterAPIView.as_view()),
    path('login', LoginAPIView.as_view()),
    path('refresh', RefreshAPIView.as_view()),
    path('logout', LogoutAPIView.as_view()),
    path('forgot', ForgotAPIView.as_view()),
    path('users/<int:user_id>/', UserDeleteAPIView.as_view(), name='user-delete'),
    path('user', UserAPIView.as_view()),
    path('all-users/', AllUsersAPIView.as_view(), name='all-users'),
    path('reset', ResetAPIView.as_view()),
]
