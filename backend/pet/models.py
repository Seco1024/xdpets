from django.db import models
from user.models import UserProfile
# Create your models here.

class Pet(models.Model):
    ownerId = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    breed = models.CharField(max_length=20)
    category = models.CharField(max_length=20)
    gender = models.CharField(max_length=10)
    age = models.IntegerField()