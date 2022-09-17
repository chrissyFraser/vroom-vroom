from django.db import models
from django.urls import reverse

class AutoVO(models.Model):
    color = models.CharField(max_length=50, default="---")
    year = models.SmallIntegerField()
    vin = models.CharField(max_length=25, unique=True)

    def __str__(self):
        return self.vin

class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("technician_detail", kwargs={"pk": self.pk})

class Appointment(models.Model):
    vip = models.BooleanField(default=False)
    vehicle = models.ForeignKey(AutoVO, related_name="service", on_delete=models.PROTECT)
    owner = models.CharField(max_length=200)
    date = models.DateField(auto_now_add=False, auto_now=False)
    time = models.TimeField(auto_now_add=False, auto_now=False)
    reason = models.TextField()
    technician = models.ForeignKey(Technician, related_name="appointment", on_delete=models.PROTECT)
    finished = models.BooleanField(default=False)
    canceled = models.BooleanField(default=False)


    def get_api_url(self):
        return reverse("appointment_detail", kwargs={"pk": self.id})

    def __str__(self):
        return f"Appointment for {self.owner}, VIP: {self.vip}"