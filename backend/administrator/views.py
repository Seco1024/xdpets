from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core import serializers
import json
from administrator.models import Administrator
from pet.models import Pet
from user.models import Profile

@csrf_exempt 
@require_http_methods(["POST"]) 
def addAdministrator(request):
    try:
        data = json.loads(request.body)
        
        if Administrator.objects.filter(email=data["email"]).exists():
            return JsonResponse({'message': '此電子郵件已被其他管理者使用'}, status=400)
        if Administrator.objects.filter(admin_name=data["adminName"]).exists():
            return JsonResponse({'message': '此名稱已被其他管理者使用'}, status=400)
        
        user_profile = Profile.objects.get(uid=data["userId"])
        admin = Administrator(admin_name=data["adminName"], email=data["email"], user_id=user_profile)
        admin.set_password(data["password"])
        admin.save()
        return JsonResponse({"message": "Administrator created successfully.", 
                             "admin_id": str(admin.admin_uid)}, status=201)

    except Profile.DoesNotExist:
        return JsonResponse({"message": "Profile not found."}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({"message": "Invalid JSON."}, status=400)
    except Exception as e:
        return JsonResponse({"message": str(e)}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def loginAdministrator(request):
    try:
        data = json.loads(request.body)
        admin_name = data["adminName"]
        password = data["password"]
        
        try:
            admin = Administrator.objects.get(admin_name=admin_name)
        except Administrator.DoesNotExist:
            return JsonResponse({"message": "Administrator not found."}, status=404)
        
        if admin.check_password(password):
            return JsonResponse({"message": "Login successful.", "admin_uid": str(admin.admin_uid)}, status=200)
        else:
            return JsonResponse({"message": "Invalid password."}, status=400)
    
    except json.JSONDecodeError:
        return JsonResponse({"message": "Invalid JSON."}, status=400)
    except Exception as e:
        return JsonResponse({"message": str(e)}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def deleteAdministrator(request):
    try:
        data = json.loads(request.body)
        admin_uid = data["admin_id"]
        admin = Administrator.objects.get(admin_uid=admin_uid)
        admin.delete()
        
        return JsonResponse({"message": "Administrator deleted successfully."}, status=200)
    
    except Administrator.DoesNotExist:
        return JsonResponse({"message": "Administrator not found."}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({"message": "Invalid JSON."}, status=400)
    except Exception as e:
        return JsonResponse({"message": str(e)}, status=500)
