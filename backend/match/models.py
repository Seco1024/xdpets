from django.db import models
import uuid
from user.models import Profile

# Create your models here.
class Preference(models.Model):
    preferenceId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    uid = models.ForeignKey(Profile, on_delete=models.CASCADE, db_column='uid')
    breed = models.CharField(max_length=15, blank=True, null=True)
    category = models.CharField(max_length=15, blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)  
    size = models.CharField(max_length=10, blank=True, null=True) 
    region = models.CharField(max_length=100, blank=True, null=True)  
    age = models.IntegerField(blank=True, null=True)
    coat_color = models.CharField(max_length=10, blank=True, null=True)
    ligated = models.BooleanField(blank=True, null=True) 
    matched = models.BooleanField(default=False)

    def __str__(self):
        return self.category