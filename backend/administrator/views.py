from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core import serializers
import json
from administrator.models import Administrator
from pet.models import Pet
from user.models import Profile
from .decorators import admin_required

@csrf_exempt
@require_http_methods(["POST"])
def addAdministrator(request):
    try:
        data = json.loads(request.body)

        if Administrator.objects.filter(email=data["email"]).exists():
            return JsonResponse({'message': '此電子郵件已被其他管理者使用', "adminId": None}, status=400)
        if Administrator.objects.filter(admin_name=data["adminName"]).exists():
            return JsonResponse({'message': '此名稱已被其他管理者使用', "adminId": None}, status=400)

        user_profile = Profile.objects.get(uid=data["userId"])
        admin = Administrator(
            admin_name=data["adminName"], email=data["email"], user_id=user_profile)
        admin.set_password(data["password"])
        admin.save()
        return JsonResponse({"message": "Administrator created successfully.",
                             "adminId": str(admin.admin_uid)}, status=201)

    except Profile.DoesNotExist:
        return JsonResponse({"message": "Profile not found.", "adminId": None}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({"message": "Invalid JSON.", "adminId": None}, status=400)
    except Exception as e:
        return JsonResponse({"message": str(e), "adminId": None}, status=500)

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
            return JsonResponse({"message": "Login successful."}, status=200)
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
        admin_uid = data["adminId"]
        admin = Administrator.objects.get(admin_uid=admin_uid)
        admin.delete()

        return JsonResponse({"message": "Administrator deleted successfully."}, status=200)

    except Administrator.DoesNotExist:
        return JsonResponse({"message": "Administrator not found."}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({"message": "Invalid JSON."}, status=400)
    except Exception as e:
        return JsonResponse({"message": str(e)}, status=500)

@admin_required()
@csrf_exempt
@require_http_methods(["POST"])
def deletePet(request):
    try:
        data = json.loads(request.body)
        pet = Pet.objects.get(pet_id=data["petId"])
        pet.delete()
        return JsonResponse({"message": "Pet deleted successfully."}, status=200)

    except Pet.DoesNotExist:
        return JsonResponse({"message": "Pet not found."}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({"message": "Invalid JSON."}, status=400)
    except Exception as e:
        return JsonResponse({"message": str(e)}, status=500)

@admin_required()
@csrf_exempt
@require_http_methods(["PUT"])
def judgePet(request):
    try:
        data = json.loads(request.body)
        pet = Pet.objects.get(pet_id=data['petId'])
        pet.legal = data['isLegal']
        pet.save()
        return JsonResponse({"message": "Preference updated successfully."}, status=200)

    except Pet.DoesNotExist:
        return JsonResponse({"message": "Pet not found."}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({"message": "Invalid JSON."}, status=400)
    except Exception as e:
        return JsonResponse({"message": str(e)}, status=500)

@admin_required()
@csrf_exempt
@require_http_methods(["GET"])
def getJudgedPets(request):
    try:
        # 找出所有legal 欄位非空的寵物
        pet_list = Pet.objects.exclude(legal=None)
        pet_list_json = []
        for pet in pet_list:
            pet_list_json.append({"petId": str(
                pet.pet_id), "petName": pet.pet_name, "isLegal": pet.legal, "userId": str(pet.owner.uid)})
        return JsonResponse({"petList": pet_list_json}, status=200)

    except Exception as e:
        return JsonResponse({"message": str(e)}, status=500)

@admin_required()
@csrf_exempt
@require_http_methods(["GET"])
def getUnjudgedPets(request):
    try:
        # 找出所有legal 欄位為空的寵物
        pet_list = Pet.objects.filter(legal=None)
        pet_list_json = []
        for pet in pet_list:
            pet_list_json.append(
                {"petId": str(pet.pet_id), "petName": pet.pet_name, "userId": str(pet.owner.uid)})
        return JsonResponse({"petList": pet_list_json}, status=200)

    except Exception as e:
        return JsonResponse({"message": str(e)}, status=500)

@admin_required()
@csrf_exempt
@require_http_methods(["GET"])
def getUnjudgedPetsList(request):
    try:
        pet_list = Pet.objects.filter(legal=None)
        pet_list_json = []
        for pet in pet_list:
            pet_list_json.append({"petId": str(
                pet.pet_id), "petName": pet.pet_name, "isLegal": pet.legal, "userId": str(pet.owner.uid)})
        return JsonResponse({"petList": pet_list_json}, status=200)

    except Exception as e:
        return JsonResponse({"message": str(e)}, status=500)
    

@admin_required()
@csrf_exempt
@require_http_methods(["GET"])
def getAllUsers(request):
    try:
        user_list = Profile.objects.all()
        user_list_json = []
        for user in user_list:
            user_list_json.append({"userId": str(user.uid), "userName": user.username, "email": user.email, "phone": user.phone})
        return JsonResponse({"userList": user_list_json}, status=200)

    except Exception as e:
        return JsonResponse({"message": str(e)}, status=500)
    
@csrf_exempt
@require_http_methods(["GET"])
def checkIsAdmin(request):
    try:
        userId = request.GET.get("userId")
        admin = Administrator.objects.get(admin_uid=userId)
        return JsonResponse({"isAdmin": True, "success":True }, status=200)
    except Administrator.DoesNotExist:
        return JsonResponse({"isAdmin": False, "success":True}, status=200)
    except Exception as e:
        return JsonResponse({"message": str(e), "success": False}, status=500)