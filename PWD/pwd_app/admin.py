from django.contrib import admin
from .models import Payment, Assignment, Location, Notification, Schedule, Review,AssistanceRequest
# Register your models here.
admin.site.register(Payment)
admin.site.register(Assignment)
admin.site.register(AssistanceRequest)
admin.site.register(Schedule)
admin.site.register(Location)
admin.site.register(Review)
admin.site.register(Notification)