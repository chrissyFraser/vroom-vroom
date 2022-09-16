from django.shortcuts import render
from .models import Salesperson, Customer, SalesRecord, AutomobileVO
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "color", "year"]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "name",
        "employeeNumber",
        "id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phoneNumber",
        "id",
    ]

class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "salesperson",
        "customer",
        "automobile",
        "price",
        "id",
    ]
    encoders = {
        "salesperson": SalespersonEncoder(),
        "automobile": AutomobileVOEncoder(),
        "customer": CustomerEncoder(),
    }



@require_http_methods(["GET", "POST"])
def api_new_salesperson(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salesperson},
            encoder=SalespersonEncoder,
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )

@require_http_methods(["GET"])
def api_salesperson_records(request, pk):
    if request.method == "GET":
        try:
            salesperson = SalesRecord.objects.filter(salesperson=pk)
            return JsonResponse(
                salesperson,
                encoder=SalesRecordEncoder,
                safe=False
            )
        except SalesRecord.DoesNotExist:
            response = JsonResponse({"message": "SalesRecord Doesn't Exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_new_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["GET"])
def api_customer_details(request, pk):
    if request.method == "GET":
        customer = Customer.objects.get(id=pk)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False
        )




@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sales = SalesRecord.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesRecordEncoder,
        )
    else:
        try:
            content = json.loads(request.body)

            autoID = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=autoID)
            content["automobile"] = automobile

            customerID = content["customer"]
            customer = Customer.objects.get(id=customerID)
            content["customer"] = customer

            salespersonID = content["sales_person"]
            salesperson = Salesperson.objects.get(id=salespersonID)
            content["salesperson"] = salesperson

            sales = SalesRecord.objects.create(**content)
            return JsonResponse(
                sales,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Auto VO Doesn't Exist"},
                status=400,
            )



@require_http_methods(["GET"])
def api_sale_details(request, pk):
    if request.method == "GET":
        try:
            sale = SalesRecord.objects.get(id=pk)
            return JsonResponse(
                sale,
                encoder=SalesRecordEncoder,
                safe=False
            )
        except SalesRecord.DoesNotExist:
            return JsonResponse(
                {"message": "SalesRecord Doesn't Exist"},
                status=400,
            )
    elif request.method == "DELETE":
        try:
            sale = SalesRecord.objects.get(id=pk)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            return JsonResponse(
                {"message": "SalesRecord Doesn't Exist"}
            )
    else:
        try:
            content = json.loads(request.body)

            sale = SalesRecord.objects.get(id=pk)
            props = ["salesperson", "customer", "automobile",  "price"]
            for prop in props:
                if prop in content:
                    setattr(sale, prop, content[prop])
            sale.save()
            return JsonResponse(
                sale,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            return JsonResponse(
                {"message": "SalesRecord Doesn't Exist"}
            )
