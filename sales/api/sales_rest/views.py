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
        sales_person = Salesperson.objects.all()
        return JsonResponse(
            {"sales_people": sales_person},
            encoder=SalespersonEncoder,
        )
    else: #"POST"
        content = json.loads(request.body)
        print("LOOK HERE!", content)
        
        salesperson = Salesperson.objects.create(**content)
        print("HERE")
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_salesperson_details(request, pk):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.filter(id=pk)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Salesperson Doesn't Exist"})
            response.status_code = 404
            return response

    elif request.method == "DELETE":
        try:
            salesperson = Salesperson.objects.get(id=pk)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson Doesn't Exist"}
            )
        
    else: #"PUT"
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.get(id=pk)
            props = ["name", "employeeNumber", "id"]
            for prop in props:
                if prop in content:
                    setattr(salesperson, prop, content[prop])
            salesperson.save()
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson Doesn't Exist"}
            )


@require_http_methods(["GET"])
def api_salesperson_records(request, pk):
    if request.method == "GET":
        try:
            salesperson_record = SalesRecord.objects.filter(salesperson=pk)
            return JsonResponse(
                salesperson_record,
                encoder=SalesRecordEncoder,
                safe=False
            )
        except SalesRecord.DoesNotExist:
            response = JsonResponse({"message": "Salesperson Record Doesn't Exist"})
            response.status_code = 404
            return response


    elif request.method == "DELETE":
        try:
            salesperson_record = SalesRecord.objects.filter(salesperson=pk)
            salesperson_record.delete()
            return JsonResponse(
                salesperson_record,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson Record Doesn't Exist"}
            )
        
    else: #"PUT"
        try:
            content = json.loads(request.body)
            salesperson_record = SalesRecord.objects.get(id=pk)
            props = ["name", "employeeNumber", "id"]
            for prop in props:
                if prop in content:
                    setattr(salesperson_record, prop, content[prop])
            salesperson_record.save()
            return JsonResponse(
                salesperson_record,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson Record Doesn't Exist"}
            )


@require_http_methods(["GET", "POST"])
def api_new_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else: #"POST"
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_customer_details(request, pk):
    if request.method == "GET":
        customer = Customer.objects.get(id=pk)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False
        )
    
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )

        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer Doesn't Exist"}
            )

    else: #"PUT"
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=pk)
            props = ["name", "address", "phoneNumber", "id"]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer Doesn't Exist"}
            )



@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sales = SalesRecord.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesRecordEncoder,
        )
    else: #"POST"
        try:
            content = json.loads(request.body)

            # print("I wanna see Dis", content)
            salespersonID = content["salesperson"]
            salesperson = Salesperson.objects.get(employeeNumber=salespersonID)
            # print(salesperson)
            content["salesperson"] = salesperson

            customerID = content["customer"]
            customer = Customer.objects.get(id=customerID)
            content["customer"] = customer

            

            autoID = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=autoID)
            content["automobile"] = automobile

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
    else: #"PUT"
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
