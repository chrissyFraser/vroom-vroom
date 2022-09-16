from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from inventory.api.inventory_rest.models import Automobile

from .models import Technician, Appointment, AutoVO
from .encoders import TechEncoder, ApptEncoder


@require_http_methods(["GET", "POST"])
def appointments_list(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=ApptEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            vin_key = content["automobile"]
            vin_value = AutoVO.objects.get(vin=vin_key)
            print("vin value", vin_value)
            content["automobile"] = vin_value
            tech_key = content["tech"]
            tech_value = Technician.objects.get(id=tech_key)
            content["tech"] = tech_value
            appointment = Appointment.objects.create(**content)
            print(appointment)
            return JsonResponse(
                appointment,
                encoder=ApptEncoder,
                safe=False,
            )
        except AutoVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid vin id"},
                status=400,
            )




@require_http_methods(["DELETE", "GET", "PUT"])
def appointment_detail(request, pk):
    if request.method == "GET":
        try: 
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=ApptEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse(
                {"message": "Appointment Not Found"},
                status = 404
                )
            return response
    elif request.method == "DELETE":
        appointment = Appointment.objects.get(id=pk)
        try:
            appointment.delete()
            return JsonResponse(
                appointment,
                encoder=ApptEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "APPOINTMENT does not exist"})
    else:
        try:
            content = json.loads(request.body)
            appointment = Appointment.objects.get(id=pk)
            props = ["owner", "date", "finished", "canceled", "vip"]
            for prop in props:
                if prop in content:
                    setattr(appointment, prop, content[prop])
            appointment.save()
            return JsonResponse(
                appointment,
                encoder=ApptEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse(
                {"message": "APPOINTMENT does not exist"},
                status=400
                )

@require_http_methods(["GET", "POST"])
def list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechEncoder,
            safe=False,
        )
    else:
        try:
            content=json.loads(request.body)
            technicians = Technician.objects.create(**content)
            return JsonResponse(
                technicians,
                encoder=TechEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message":"TECHNICIAN does not exist"},
                status=400
            )

@require_http_methods(["DELETE", "GET", "PUT"])
def technician_detail(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician does not exist"},
                status=400
                )
    elif request.method == "DELETE":
        try:
            technicians = Technician.objects.get(id=pk)
            technicians.delete()
            return JsonResponse(
                technicians, 
                encoder=TechEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician does not exist"},
                status=400,
                )
    else:
        try:
            content = json.loads(request.body)
            tech = TechEncoder

            props = ["name", "id"]
            for prop in props:
                if prop in content:
                    setattr(tech, prop, content[prop])
            tech.save()
            return JsonResponse(
                tech,
                encoder=TechEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "TECHNICIAN does not exist"},
                status=400,
            )

@require_http_methods(["GET"])
def service_history(request, vin):
    if request.method == "GET":
        try:
            service = Appointment.objects.filter(auto_vin=vin)
            return JsonResponse(
                service,
                encoder=ApptEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "APPOINTMENT does not exist"},
                status=400,
            )
