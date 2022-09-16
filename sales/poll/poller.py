import json
import os
import sys
import time

import django
import requests


sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest.models import AutomobileVO

def get_automobile_vo():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(
            vin=automobile["vin"],  # ID polling from Auto Model
            defaults={"year": automobile["year"],  # VOs we can change
                      "color": automobile["color"]},
        )


def poll():
    while True:
        try:
            get_automobile_vo()
        except Exception as e:
            print(e)
        time.sleep(5)


if __name__ == "__main__":
    poll()
