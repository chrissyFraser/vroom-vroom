from common.json import ModelEncoder

from .models import AutoVO, Technician, Appointment

class AutoVOEncoder(ModelEncoder):
    model = AutoVO
    properties = [
        "color",
        "year",
        "vin",
    ]

class TechEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "id",
    ]

class ApptEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vip",
        "vehicle",
        "owner",
        "date",
        "time",
        "reason",
        "technician",
        "finished",
        "canceled",
    ]
    encoders = {
        "vehicle": AutoVOEncoder(),
        "technician": TechEncoder(),
    }
