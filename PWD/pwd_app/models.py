from django.conf import settings  # For referencing the custom User model
from django.db import models

class AssistanceRequest(models.Model):
    description = models.TextField()
    requested_date = models.DateField()
    requested_time = models.TimeField()
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Assigned', 'Assigned'), ('Completed', 'Completed')])
    requested_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='assistance_requests')  # Reference to the requesting user

class Assignment(models.Model):
    request = models.ForeignKey(AssistanceRequest, on_delete=models.CASCADE, related_name='assignments')
    assistant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='assigned_tasks')  # Reference to the assistant (user)
    volunteer = models.BooleanField(default=False)
    payment = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Only if the assistant is paid
    assigned_date = models.DateField(auto_now_add=True)

class Payment(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='payment_assignments')  # Payment for a specific assignment
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    paid_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='payments')  # Reference to who made the payment

class Review(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField()
    feedback = models.TextField()
    reviewed_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')  # Reference to the user giving the review

class Schedule(models.Model):
    task_date = models.DateField()
    task_time = models.TimeField()
    task_description = models.TextField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='schedules')  # Reference to the user who created the schedule

class Location(models.Model):
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='locations')  # Reference to the user associated with the location

class Notification(models.Model):
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')  # Reference to the user who receives the notification
