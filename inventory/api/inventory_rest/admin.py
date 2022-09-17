from django.contrib import admin
from .models import Manufacturer, VehicleModel, Automobile


@admin.register(Manufacturer)
class ManufacturerAdmin(admin.ModelAdmin):
    pass

@admin.register(VehicleModel)
class VehicleModelAdmin(admin.ModelAdmin):
    pass

@admin.register(Automobile)
class AutomobileAdmin(admin.ModelAdmin):
    pass

