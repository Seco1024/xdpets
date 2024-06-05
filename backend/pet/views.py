from django.shortcuts import render
from django.http import JsonResponse
from .models import Pet, PetImage
from user.models import Profile
from django.conf import settings


def getAllPets(request):
    if request.method == 'GET':
        pets = Pet.objects.filter(legal=True)
        if pets.exists():
            pet_info = []
            for pet in pets:
                pet_images = pet.images.all()
                pet_info.append({
                    'pet_id': str(pet.pet_id),
                    'pet_name': pet.pet_name,
                    'breed': pet.breed,
                    'region': pet.region,
                    'category': pet.category,
                    'gender': pet.gender,
                    'image_url': pet_images[0].image.url if pet_images else None
                })

            return JsonResponse({'status': 200, 'success': True, 'allPetInformation': pet_info})
        else:
            return JsonResponse({'status': 200, 'success': True, 'message': '尚無寵物'})    
    else:
        return JsonResponse({'status': 405, 'success': False, 'message': 'Method not allowed'})


def getPet(request):
    if request.method == 'GET':
        pet_id = request.GET.get('pet_id', None)
        
        if not pet_id:
            return JsonResponse({'status': 400, 'success': False, 'message': 'Missing pet_id parameter'}, status=400)

        try:
            pet = Pet.objects.get(pet_id=pet_id)
            pet_images = PetImage.objects.filter(pet=pet)
            images_urls = [image.image.url for image in pet_images]
            
            pet_info = {
                'pet_id': str(pet.pet_id),
                'pet_name': pet.pet_name,
                'breed': pet.breed,
                'category': pet.category,
                'gender': pet.gender,
                'size': pet.size,
                'region': pet.region,
                'age': pet.age,
                'coat_color': pet.coat_color,
                'ligated': pet.ligated,
                'post_date': pet.post_date,
                'info': pet.info,
                'owner_id': pet.owner.uid,
                'images_urls': images_urls,
            }
            return JsonResponse({'status': 200, 'success': True, 'PetInformation': pet_info}, status=200)
        except Pet.DoesNotExist:
            return JsonResponse({'status': 404, 'success': False, 'message': 'Pet not found'},  status=404)
    else:
        return JsonResponse({'status': 405, 'success': False, 'message': 'Method not allowed'}, status=405)
    

def getMyPets(request):
    if request.method == 'GET':
        user_id = request.GET.get('user_id', None)
        
        if not user_id:
            return JsonResponse({'status': 400, 'success': False, 'message': 'Missing user_id parameter'}, status=400)

        try:
            pets = Pet.objects.filter(owner_id=user_id, legal=True)
            if not pets.exists():
                return JsonResponse({'status': 404, 'success': False, 'message': 'No pets found for this user'}, status=404)

            pet_info = []
            for pet in pets:
                pet_images = PetImage.objects.filter(pet=pet)
                image_urls = [pet_image.image.url for pet_image in pet_images]
                
                pet_info.append({
                    'pet_id': str(pet.pet_id),
                    'pet_name': pet.pet_name,
                    'breed': pet.breed,
                    'category': pet.category,
                    'gender': pet.gender,
                    'size': pet.size,
                    'region': pet.region,
                    'age': pet.age,
                    'coat_color': pet.coat_color,
                    'ligated': pet.ligated,
                    'post_date': pet.post_date,
                    'info': pet.info,
                    'owner_id': pet.owner.uid,
                    'image_urls': image_urls,
                })

            return JsonResponse({'status': 200, 'success': True, 'PetInformation': pet_info}, status=200)
        except Pet.DoesNotExist:
            return JsonResponse({'status': 404, 'success': False, 'message': 'Pet not found'}, status=404)
    else:
        return JsonResponse({'status': 405, 'success': False, 'message': 'Method not allowed'}, status=405)