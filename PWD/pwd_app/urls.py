from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'assistance-requests', views.AssistanceRequestViewSet)
router.register(r'assignments', views.AssignmentViewSet)
router.register(r'payments', views.PaymentViewSet)
router.register(r'reviews', views.ReviewViewSet)
router.register(r'schedules', views.ScheduleViewSet)
router.register(r'locations', views.LocationViewSet)
router.register(r'notifications', views.NotificationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
