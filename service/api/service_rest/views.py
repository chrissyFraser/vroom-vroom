from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .models import Technician, Appointment, AutoVO
from .encoders import TechEncoder, ApptEncoder


# Create your views here.
@require_http_methods(["GET", "POST"])
def api_appointments(request):
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
            if AutoVO.objects.filter(vin=content["vin"]).exists():
                content["vip"] = True
            else:
                content["vip"] = False
        except AutoVO.DoesNotExist:
            return JsonResponse(
                {"ERROR": "INVALID VIN"},
                status=400
            )
    appointment = Appointment.objects.create(**content)
    return JsonResponse(appointment, encoder=ApptEncoder, safe=False)

