# tasks.py
from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
from django.db.models import Q
from .models import Preference
from pet.models import Pet
from user.models import Profile


@shared_task
def check_preferences_and_send_emails():
    preferences = Preference.objects.all()
    pets = Pet.objects.all()

    for preference in preferences:
        query = Q()
        if preference.breed:
            query &= Q(breed=preference.breed)
        if preference.category:
            query &= Q(category=preference.category)
        if preference.gender:
            query &= Q(gender=preference.gender)
        if preference.size:
            query &= Q(size=preference.size)
        if preference.region:
            query &= Q(region=preference.region)
        if preference.age:
            query &= Q(age=preference.age)
        if preference.coat_color:
            query &= Q(coat_color=preference.coat_color)
        if preference.ligated is not None:
            query &= Q(ligated=preference.ligated)
        
        # 查找匹配的寵物
        matching_pets = pets.filter(query)

        if matching_pets.exists():
            pet_info = '\n'.join([f"{pet.pet_name} ({pet.breed})" for pet in matching_pets])
            email_subject = 'Matching Pets Found'
            email_body = f'Dear {preference.uid.username},\n\nWe have found the following pets that match your preferences:\n{pet_info}'
            
            send_mail(
                email_subject,
                email_body,
                settings.DEFAULT_FROM_EMAIL,
                [preference.uid.email],
                fail_silently=False,
            )
