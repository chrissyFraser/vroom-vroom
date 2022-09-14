from django.urls import path
from .views import list_salespeople, salesperson, list_customers, customer, list_sales_records, sale_record

urlpatterns = [
    path('list_salespeople/', list_salespeople, name="list_salespeople"),
    path('salesperson/<int:pk>/', salesperson, name="salesperson"),
    path('list_customers/', list_customers, name="list_customers"),
    path('customer/<int:pk>/', customer, name="customer"),
    path('list_sales_records', list_sales_records, name="list_sales_records"),
    path('sale_record/<int:pk>/', sale_record, name="sale_record"),
]
