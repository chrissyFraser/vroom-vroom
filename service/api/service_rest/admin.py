from django.contrib import admin

from .models import Appointment, AutoVO, Technician

@admin.register(AutoVO)
class AutoVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    pass
