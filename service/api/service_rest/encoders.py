from common.json import ModelEncoder

from .models import AutoVO, Technician, Appointment

class AutoVOEncoder(ModelEncoder):
    model = AutoVO
    properties = [
        "import_href",
        "vin",
    ]

class TechEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_id",
    ]

class ApptEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vip",
        "vin",
        "customer_name",
        "date_time",
        "reason",
        "technician",
    ]
    encoders = {
        "technician": TechEncoder()
    }

    def get_extra_data(self, o):
        return {"technician": o.technician.name}