
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("core.urls")),
    path('pwd/', include("pwd_app.urls")),
]
