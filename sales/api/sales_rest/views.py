from django.shortcuts import render
from .models import SalesPerson, Customer, SaleRecord, AutomobileVO
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "import_href"]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employeeNumber",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phoneNumber",
    ]


class SaleRecordEncoder(ModelEncoder):
    model = SaleRecord
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "price",
    ]

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
    }


@require_http_methods(["GET", "POST"])
def list_salespeople(request):
    if request.method == "GET":
        salesperson = SalesPerson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalesPersonEncoder
        )
    else:  # method == "POST"
        content = json.loads(request.body)
        salesperson = SalesPerson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalesPersonEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def salesperson(request, pk):
    if request.method == "GET":
        try:
            salesperson = SalesPerson.objects.get(id=pk)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False
            )
        except:
            SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            salesperson = SalesPerson.objects.get(id=pk)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:  # method == "PUT"
        try:
            content = json.loads(request.body)
            salesperson = SalesPerson.objects.get(id=pk)

            props = ["name", "employeeNumber"]
            for prop in props:
                if prop in content:
                    setattr(salesperson, prop, content[prop])
                salesperson.save()
                return JsonResponse(
                    salesperson,
                    encoder=SalesPersonEncoder,
                    safe=False
                )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:  # method == "POST"
        content = json.loads(request.body)
        customers = Customer.objects.create(**content)
        return JsonResponse(
            customers,
            encoder=CustomerEncoder,
            safe=False
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

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
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

    else:  # method == "PUT"
        try:
            content = json.laods(request.body)
            customer = Customer.objects.get(id=pk)
            props = ["name", "address", "phoneNumber"]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def list_sales_records(request):
    if request.method == "GET":
        sale_records = SaleRecord.objects.all()
        return JsonResponse(
            sale_records,
            encoder=SaleRecordEncoder,
        )
    else:  # method == "POST"
        content = json.loads(request.body)
        try:
            auto_href = content["automobile"]
            automobile = AutomobileVO.objects.get(import_href=auto_href)
            content["automobile"] = automobile

        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Auto ID"},
                status=400,
            )

        sale_record = SaleRecord.objects.create(**content)
        return JsonResponse(
            sale_record,
            encoder=SaleRecord,
            safe=False
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def sale_record(request, pk):
    if request.method == "GET":
        try:
            sale_record = SaleRecord.objects.get(id=pk)
            return JsonResponse(
                sale_record,
                encoder=SaleRecordEncoder,
                safe=False
            )
        except SaleRecord.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

    elif request.method == "DELETE":
        try:
            sale_record = SaleRecord.objects.get(id=pk)
            sale_record.delete()
            return JsonResponse(
                sale_record,
                encoder=SaleRecordEncoder,
                safe=False
            )
        except SaleRecord.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

    else:  # method == "PUT"
        try:
            content = json.loads(request.body)
            sale_record = SaleRecord.objects.get(id=pk)
            props = ["automobile", "salesperson", "customer", "price"]
            for prop in props:
                if prop in content:
                    setattr(sale_record, prop, content[prop])
            sale_record.save()
            return JsonResponse(
                sale_record,
                encoder=SaleRecordEncoder,
                safe=False
            )
        except SaleRecord.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
