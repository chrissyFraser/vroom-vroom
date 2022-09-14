from django.urls import path

from .views import (
    api_appointments
)

urlpatterns = [
    path("appointments/", api_appointments, name="api_appointments"),
]
