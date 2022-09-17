from django.urls import path

from .views import (
    appointment_detail,
    appointment_list, 
    technician_detail, 
    technician_list,
    service_history,
)

urlpatterns = [
    path("appointments/", appointment_list, name="appointments_list"),
    path("appointments/<int:pk>/", appointment_detail, name="appointment_detail"),
    path("technicians/", technician_detail, name="technicians_list"),
    path("technicians/<int:pk>/", technician_list, name="technician_detail"),
    path("vin/appointment/<str:vin>/", service_history, name="service_list"),
]
