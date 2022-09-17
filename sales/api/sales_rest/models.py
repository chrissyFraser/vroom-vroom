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
    employeeNumber = models.IntegerField(unique=True)
    def __str__(self):
        return self.name


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField(max_length=500)
    phoneNumber = models.CharField(max_length=50)
 
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

    def __str__(self):
        return str("Salesperson: " + self.salesperson.name)



