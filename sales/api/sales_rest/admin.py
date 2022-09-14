from django.contrib import admin
from .models import SalesPerson, Customer, SaleRecord, AutomobileVO

admin.site.register(SalesPerson)
admin.site.register(Customer)
admin.site.register(SaleRecord)
admin.site.register(AutomobileVO)
