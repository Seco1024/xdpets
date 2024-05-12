from django.db import models
from user.models import Users
# Create your models here.

class Pet(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='pets')
    name = models.CharField(max_length=20)
    breed = models.CharField(max_length=20)
    category = models.CharField(max_length=20)
    gender = models.CharField(max_length=10)
    age = models.IntegerField()