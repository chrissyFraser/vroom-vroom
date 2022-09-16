from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    color = models.CharField(max_length=50, default="color")
    year = models.IntegerField(default=0000)
    vin = models.CharField(max_length=20, unique=True)
    def __str__(self):
        return self.vin


class Salesperson(models.Model):
    name = models.CharField(max_length=100)
    employeeNumber = models.IntegerField(primary_key=True)
    def get_api_url(self):
        return reverse("api_salesperson_records", kwargs={"pk": self.pk})
    def __str__(self):
        return self.name


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField(max_length=500)
    phoneNumber = models.CharField(max_length=50)
    def get_api_url(self):
        return reverse("api_customer_details", kwargs={"pk": self.pk})
    def __str__(self):
        return self.name


class SalesRecord(models.Model):
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.PROTECT
    )
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.PROTECT
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.PROTECT
    )
    price = models.IntegerField()

    def get_api_url(self):
        return reverse("api_sales", kwargs={"pk": self.pk})

    def __str__(self):
        return str("Salesperson: " + self.salesperson.name)



