from django.db import models
from django.urls import reverse


class Manufacturer(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def get_api_url(self):
        return reverse("api_manufacturer", kwargs={"pk": self.id})

    def __str__(self):
        return self.name


class VehicleModel(models.Model):
    name = models.CharField(max_length=100)
    picture_url = models.URLField()

    manufacturer = models.ForeignKey(
        Manufacturer,
        related_name="models",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_vehicle_model", kwargs={"pk": self.id})

    def __str__(self):
        return self.name


class Automobile(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)

    model = models.ForeignKey(
        VehicleModel,
        related_name="automobiles",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin": self.vin})

    def __str__(self):
        return self.model, self.year






# {'autos': [{'href': '/api/automobiles/5N1MD28Y02C565437/', 'id': 1, 'color': 'black', 'year': 2011, 'vin': '5N1MD28Y02C565437', 'model': {'href': '/api/models/1/', 'id': 1, 'name': 'CR-V', 'picture_url': 'https://automanager.blob.core.windows.net/wmphotos/019736/e33cd0df53714018864928f440f4e02e/42dfb9cc0e_800.jpg', 'manufacturer': {'href': '/api/manufacturers/1/', 'id': 1, 'name': 'Honda'}}}, {'href': '/api/automobiles/6N1MD28Y02C565437/', 'id': 2, 'color': 'black', 'year': 2011, 'vin': '6N1MD28Y02C565437', 'model': {'href': '/api/models/1/', 'id': 1, 'name': 'CR-V', 'picture_url': 'https://automanager.blob.core.windows.net/wmphotos/019736/e33cd0df53714018864928f440f4e02e/42dfb9cc0e_800.jpg', 'manufacturer': {'href': '/api/manufacturers/1/', 'id': 1, 'name': 'Honda'}}}]}