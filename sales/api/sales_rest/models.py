#from unicodedata import name
from django.db import models
#from phonenumber_field.modelfields import PhoneNumberField
#from address.models import AddressField
#from djmoney.models.fields import MoneyField


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)


class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employeeNumber = models.IntegerField()


class Customer(models.Model):
    name = models.CharField(max_length=100)
    #address = AddressField()
    address = models.TextField()
    #phoneNumber = PhoneNumberField()
    phoneNumber = models.CharField(max_length=20)


class SaleRecord(models.Model):
    automobile = models.OneToOneField(
        AutomobileVO,
        related_name="sale_record",
        on_delete=models.CASCADE,
        primary_key=True,
    )
    sales_person = models.ForeignKey(
        SalesPerson, related_name="sale_record", on_delete=models.CASCADE)
    customer = models.ForeignKey(
        Customer, related_name="sale_record", on_delete=models.CASCADE)
    # price = MoneyField(decimal_places=2, default=0,
    # default_currency='USD', max_digits=10, null=True)
    price = models.IntegerField()
