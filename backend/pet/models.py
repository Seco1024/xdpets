from django.db import models
from user.models import Profile
from django.utils import timezone
import uuid
# Create your models here.

class Pet(models.Model):
    pet_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    pet_name = models.CharField(max_length=100)
    breed = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    size = models.CharField(max_length=10)
    region = models.CharField(max_length=100)
    age = models.CharField(max_length=10)
    coat_color = models.CharField(max_length=10)
    ligated = models.BooleanField()
    post_date = models.DateTimeField(default=timezone.now)
    info = models.TextField()
    legal = models.BooleanField(blank=True, null=True)
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)


class PetImage(models.Model):
    pet = models.ForeignKey(Pet, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='../media/pet_images/')