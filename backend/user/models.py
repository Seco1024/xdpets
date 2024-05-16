from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
import uuid

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length = 20, null = False, blank = False)
    uid = models.UUIDField(primary_key= True,default=uuid.uuid4, editable=False, unique=True)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.user.username
