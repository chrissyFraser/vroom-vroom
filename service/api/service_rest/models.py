from django.db import models
from django.urls import reverse

class AutoVO(models.Model):
    import_href = models.CharField(max_length=250, unique=True)
    vin = models.CharField(max_length=22)

class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_id = models.AutoField(primary_key=True)

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.pk})

class Appointment(models.Model):
    vip = models.BooleanField(default=False)
    vin = models.CharField(max_length=22)
    customer_name = models.CharField(max_length=200)
    date_time = models.DateTimeField()
    reason = models.TextField()
    technician = models.ForeignKey(Technician, related_name="appointments", on_delete=models.CASCADE)