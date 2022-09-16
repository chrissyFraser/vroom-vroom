from django.urls import path

from .views import (
    api_appointments,
    api_appointment, 
    api_technicians, 
    api_technician,
)

urlpatterns = [
    path("appointments/", api_appointments, name="api_appointments_list"),
    path("appointments/<int:pk>/", api_appointment, name="api_appointment"),
    path("technicians/", api_technicians, name="api_technicians_list"),
    path("technicians/<int:pk>/", api_technician, name="api_technician"),
]
