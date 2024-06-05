# tasks.py
from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
from django.db.models import Q
from django.core.cache import cache
from .models import Preference
from pet.models import Pet
from user.models import Profile


@shared_task
def check_preferences_and_send_emails():
    preferences = Preference.objects.all()
    pets = Pet.objects.all()

    for preference in preferences:
        query = Q()
        for keys in preference.__dict__.keys():
            if keys in ['_state', 'uid', 'preferenceId', 'matched']:
                continue
            if getattr(preference, keys):
                query &= Q(**{keys: getattr(preference, keys)})

        query &= Q(legal=True)
        matching_pets = pets.filter(query)
        
        for pet in matching_pets:
            cache_key = f"matched_{preference.preferenceId}_{pet.pet_id}"
            if not cache.get(cache_key) or not preference.matched:
                cache.set(cache_key, True, timeout=None)
                preference.matched = True
                preference.save()
            else:
                matching_pets = matching_pets.exclude(pet_id=pet.pet_id)

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
