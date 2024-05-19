from django.db import models
from django.utils import timezone
from user.models import Profile
import uuid
# Create your models here.

class Pet(models.Model):
    petId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    ownerId = models.ForeignKey(Profile, on_delete=models.CASCADE, db_column='uid')
    name = models.CharField(max_length=20)
    breed = models.CharField(max_length=15, blank=True, null=True)
    category = models.CharField(max_length=15, blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)  
    size = models.CharField(max_length=10, blank=True, null=True) 
    region = models.CharField(max_length=100, blank=True, null=True)  
    age = models.IntegerField(blank=True, null=True)
    coat_color = models.CharField(max_length=10, blank=True, null=True)
    ligated = models.BooleanField(blank=True, null=True) 
    post_date = models.DateTimeField(default=timezone.now)
    info = models.TextField(blank=True, null=True)
    legal = models.BooleanField(blank=True, null=True)