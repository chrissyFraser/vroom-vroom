from django.urls import path
from .views import api_new_salesperson, api_salesperson_records, api_new_customer, api_customer_details, api_sales, api_sale_details

urlpatterns = [
    path('new_salesperson/', api_new_salesperson, name="api_new_salesperson"),
    path('salesperson_records/<int:pk>/', api_salesperson_records, name="api_salesperson_records"),
    path('new_customer/', api_new_customer, name="api_new_customer"),
    path('customer_details/<int:pk>/', api_customer_details, name="api_customer_details"),
    path('sales/', api_sales, name="api_sales"),
    path('sales/<int:pk>/', api_sale_details, name="api_sale_details"),
]