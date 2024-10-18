from rest_framework import viewsets
from .models import AssistanceRequest, Assignment, Payment, Review, Schedule, Location, Notification
from .serialisers import AssistanceRequestSerializer, AssignmentSerializer, PaymentSerializer, ReviewSerializer, ScheduleSerializer, LocationSerializer, NotificationSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class AssistanceRequestViewSet(viewsets.ModelViewSet):
    queryset = AssistanceRequest.objects.all().order_by('-id')
    serializer_class = AssistanceRequestSerializer

    @action(detail=False, methods=['get'], url_path='count')
    def count(self, request):
        """
        Returns the count of assistance requests.
        """
        count = self.queryset.count()
        return Response({'count': count})
    
class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
