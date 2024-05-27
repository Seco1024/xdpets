from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core import serializers
import json
from .models import Preference
from user.models import Profile

@csrf_exempt 
@require_http_methods(["POST"]) 
def addPreference(request):
    try:
        data = json.loads(request.body)
        user_profile = Profile.objects.get(uid=data['userId'])
        preference_data = {
            "uid": user_profile,
            "breed": data['PreferenceInfo']['breed'],
            "category": data['PreferenceInfo']['category'],
            "gender": data['PreferenceInfo']['gender'],
            "size": data['PreferenceInfo']['size'],
            "region": data['PreferenceInfo']['region'],
            "age": data['PreferenceInfo']['age'],
            "coat_color": data['PreferenceInfo']['coat_color'],
            "ligated": data['PreferenceInfo']['ligated'],
        }

        preference, created = Preference.objects.get_or_create(**preference_data)

        if not created:
            return JsonResponse({"message": "Preference already exists.", "preferenceId": None}, status=400)
        else:
            return JsonResponse({"message": f"Preference created successfully.", "preferenceId": preference.preferenceId}, status=201)
    
    except json.JSONDecodeError:
        return JsonResponse({"message": "Invalid JSON.", "preferenceId": None}, status=400)
    
    except Exception as e:
        return JsonResponse({"message": str(e), "preferenceId": None}, status=500)
    

@csrf_exempt
@require_http_methods(["GET"])
def getPreference(request):
    try:
        user_id = request.GET.get('userId')
        preferenceInfo = Preference.objects.filter(uid=user_id)
        preferences_json = serializers.serialize('json', preferenceInfo)
        
        return JsonResponse({"preferences": json.loads(preferences_json)}, status=200)
    
    except Profile.DoesNotExist:
        return JsonResponse({"message": "User profile not found."}, status=404)
    except Exception as e:
        return JsonResponse({"message": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def updatePreference(request):
    try:
        data = json.loads(request.body)
        if not data['preferenceId']:
            return JsonResponse({"message": "preferenceId is required."}, status=400)
        
        updated_data = {}
        preference = Preference.objects.get(preferenceId=data['preferenceId'], uid=data['userId'])
        for key, value in data['matchInfo'].items():
            setattr(preference, key, value)
            updated_data[key] = value

        filter_params = {**updated_data, 'uid': data['userId']}
        if Preference.objects.filter(**filter_params).exclude(preferenceId=data['userId']).exists():
            return JsonResponse({"message": "Updating preference will cause duplication."}, status=400)
        
        preference.save()
        return JsonResponse({"message": "Preference updated successfully."}, status=200)
    
    except Profile.DoesNotExist:
        return JsonResponse({"message": "User profile not found."}, status=404)
    except Preference.DoesNotExist:
        return JsonResponse({"message": "Preference not found."}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({"message": "Invalid JSON."}, status=400)
    except Exception as e:
        return JsonResponse({"message": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def deletePreference(request):
    try:
        data = json.loads(request.body)
        if not data['preferenceId']:
            return JsonResponse({"message": "preferenceId is required."}, status=400)
        
        preference = Preference.objects.get(preferenceId=data['preferenceId'], uid=data['userId'])
        preference.delete()
        return JsonResponse({"message": "Preference deleted successfully."}, status=200)
    
    except Profile.DoesNotExist:
        return JsonResponse({"message": "User profile not found."}, status=404)
    except Preference.DoesNotExist:
        return JsonResponse({"message": "Preference not found."}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({"message": "Invalid JSON."}, status=400)
    except Exception as e:
        return JsonResponse({"message": str(e)}, status=500)
