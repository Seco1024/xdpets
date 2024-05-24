from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import check_password, make_password
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User

from .models import Profile
from pet.models import Pet 

# Create your views here.
@csrf_exempt
def sign_up(request):
    if request.method == 'POST':
        try:
            email = request.POST["email"]
            username = request.POST["username"]
            password = request.POST["password"]
            phone = request.POST["phone"]

            validate_password(password) # 驗證密碼是否符合要求
            
            encrypted_password = make_password(password) # 加密密碼

            # 用戶名和電子郵件不能重複
            if Profile.objects.filter(email=email).exists():
                return JsonResponse({'status': 400, 'message': '電子郵件已存在'})
            if Profile.objects.filter(username=username).exists():
                return JsonResponse({'status': 400, 'message': '用戶名已存在'})
            
            profile = Profile.objects.create(email = email, username = username, password = encrypted_password, phone = phone) 
            profile.save()


            profile_info = {
                'uid': profile.uid,
                'email': profile.email,
                'phone': profile.phone,
                'username': profile.username,
                'date': profile.date,
            }
            return JsonResponse({'status': 200, 'profile': profile_info})

        except ValidationError as e:
            return JsonResponse({'status': 400, 'message': e.messages})
        
        except Exception as e:
            return JsonResponse({'status': 500, 'message': str(e)})
    else:
        return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        users = Profile.objects.filter(username=username)
        if users.exists():
            user = users.first() 
            if user.authenticate(password):
                request.session['uid'] = str(user.uid)
                return JsonResponse({'status': 200, 'message': '登入成功'}, status=200)
            else:
                return JsonResponse({'status': 400, 'message': '密碼錯誤'}, status=400)
        else:
            return JsonResponse({'status': 400, 'message': '用戶不存在'}, status=400)
    else:
        return HttpResponseNotAllowed(['POST'])
    
@csrf_exempt
def add_new_pet(request):
    if request.method == 'POST':
        user_id = request.POST['ownerId']
        pet_name = request.POST['name']
        breed = request.POST['breed']
        category = request.POST['category']
        gender = request.POST['gender']
        size = request.POST['size']
        region = request.POST['region']
        age = request.POST['age']
        coat_color = request.POST['coar_color']
        ligated = request.POST['ligated']
        info = request.POST['info']
        legal = request.POST['legal']
        
        try:
            owner = Profile.objects.get(uid=user_id)
        except Profile.DoesNotExist:
            return JsonResponse({'status': 404, 'message': '找不到用户'}, status=404)

        try:
            # 假設Pet模型中有一個外鍵指向User模型
            pet = Pet.objects.create(owner=owner, 
                                     pet_name=pet_name, 
                                     breed=breed, 
                                     category=category, 
                                     gender=gender, 
                                     age=age, 
                                     size=size, 
                                     region=region, 
                                     coat_color=coat_color,
                                     ligated=ligated,
                                     info=info,
                                     legal=legal)
            pet.save()
            
            pet_info = {
                'pet_id': pet.pet_id,
                'pet_name': pet.pet_name,
                'breed': pet.breed,
                'category': pet.category,
                'gender': pet.gender,
                'age': pet.age,
                'size': pet.size,
                'region': pet.region,
                'coat_color': pet.coat_color,
                'ligated': pet.ligated,
                'info': pet.info,
                'legal': pet.legal,
            }
            return JsonResponse({'status': 200, 'success': True, 'pet_info': pet_info}, status=200)
            # return JsonResponse({'status': 200, 'success': True, 'pet_info': pet.objects.all()})
        except Exception as e:
            return JsonResponse({'status': 500, 'success': False, 'message': str(e)}, status=500)

    else:
        # return HttpResponseNotAllowed(['POST'])
        return JsonResponse({'status': 400, 'success': False, 'message': '只接受POST請求'}, status=400)

@csrf_exempt
def delete_pet(request):
    if request.method == 'POST':
        user_id = request.POST['userId']
        pet_id = request.POST['petId']
        # 驗證和處理輸入...

        try:
            pet = Pet.objects.get(id=pet_id, owner__uid=user_id)  # 假設Pet模型中有一個外鍵指向Users模型的uid字段
            pet.delete()
            return JsonResponse({'status': 200, 'success': True, 'message': '寵物刪除成功'}, status=200)
        except Pet.DoesNotExist:
            return JsonResponse({'status': 404, 'success': False, 'message': '寵物不存在'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 500, 'success': False, 'message': str(e)}, status=500)

    return JsonResponse({'status': 400, 'success': False, 'message': '只接受POST請求'}, status=400)

# @require_http_methods(["GET"])
# def get_information(request):
#     userId = request.GET['uid']
#     if not userId:
#         return JsonResponse({'status': 'error', 'message': '缺少用戶ID參數'})

#     try:
#         user = Profile.objects.get(uid=userId)
#         user_info = {
#             'username': user.username,
#             'email': user.email,
#             'phone': user.phone,
#         }
#         return JsonResponse({'status': 'success', 'data': user_info})
    
#     except Profile.DoesNotExist:
#         return JsonResponse({'status': 'error', 'message': '用戶不存在'})

#     except Exception as e:
#         return JsonResponse({'status': 'error', 'message': str(e)})






