# myapp/models.py

from django.db import models

class Customer(models.Model):
    customer_id = models.IntegerField(primary_key=True)
    full_name = models.CharField(max_length=30)

    def __str__(self):
        return f"Customer ID: {self.customer_id}, Name: {self.full_name}"

