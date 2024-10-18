from rest_framework import serializers
from .models import AssistanceRequest, Assignment, Payment, Review, Schedule, Location, Notification

class AssistanceRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssistanceRequest
        fields = '__all__'

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'
class NotificationSerializer(serializers.ModelSerializer):
    recipient_full_name = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = ['id', 'message', 'created_at', 'recipient_full_name']

    def get_recipient_full_name(self, obj):
        # Assuming the recipient has 'first_name' and 'last_name' fields
        return f"{obj.recipient.first_name} {obj.recipient.last_name}"