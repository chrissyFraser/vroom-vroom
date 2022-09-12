from unicodedata import name
from django.db import models
from django.forms import


class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employeeNumber = models.IntegerField()


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=500)
    phoneNumber = models.PhoneNumberField(_(""))


class SaleRecord(models.Model):
    pass
