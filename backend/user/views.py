from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
import uuid
import datetime as dt

from .models import UserProfile
# from .models import Pet 

# Create your views here.
@csrf_exempt
def sign_up(request):
    if request.method == 'POST':
        try:
            email = request.POST["email"]
            phone = request.POST["phone"]
            username = request.POST["username"]
            password = request.POST["password"]
            
            print("ddada")
            user = User.objects.create_user(username = username, email = email, password = password)
            print("ddada")
            # 创建用户配置文件
            profile = UserProfile.objects.create(user = user, phone = phone) 
            print("ddada")
            profile.save()

            print(profile)
            # 用戶名和電子郵件不能重複
            if profile.objects.filter(email=email).exists():
                return JsonResponse({'status': 'error', 'message': '電子郵件已存在'})
            if profile.objects.filter(username=username).exists():
                return JsonResponse({'status': 'error', 'message': '用戶名已存在'})

            print(profile.uid)

            validate_password(password) # 驗證密碼是否符合要求
            # user.set_password(password) # 加密密碼
            profile_info = {
                'userId': profile.uid,
                'email': profile.user.email,
                'phone': profile.phone,
                'username': profile.user.username,
                'date': profile.date,
            }
            return JsonResponse({'status': 'success', 'profile': profile_info})

        except ValidationError as e:
            return JsonResponse({'status': 'ValidationError', 'message': e.messages})
        
        except Exception as e:
            return JsonResponse({'status': 'ExceptionError', 'message': str(e)})
    else:
        return HttpResponseNotAllowed(['POST'])
        
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None and user.is_active:
            login(request, user)
            # return HttpResponse('登錄成功')
            return JsonResponse({'status': 'success', 'message': '登錄成功'})
        else:
            # return HttpResponse('登錄失敗，請檢查您的用戶名和密碼')
            return JsonResponse({'status': 'error', 'message': '登錄失敗，請檢查您的用戶名和密碼'})
    else:
        # Render the login form
        return render(request, 'login.html', locals())
    

@require_http_methods(["GET"])
def get_information(request):
    userId = request.GET['userId']
    if not userId:
        return JsonResponse({'status': 'error', 'message': '缺少用戶ID參數'})

    try:
        user = UserProfile.objects.get(uid=userId)
        user_info = {
            'username': user.username,
            'email': user.email,
            'phone': user.phone,
        }
        return JsonResponse({'status': 'success', 'data': user_info})
    
    except UserProfile.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': '用戶不存在'})

    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})


# @csrf_exempt
# def add_new_pet(request):
#     if request.method == 'POST':
#         user_id = request.POST['userId']
#         pet_name = request.POST['petName']
#         pet_breed = request.POST['petBreed']
#         pet_category = request.POST['petCategory']
#         pet_gender = request.POST['petGender']

#         try:
#             # 假設Pet模型中有一個外鍵指向User模型
#             pet = Pet.objects.create(user_id=user_id, name=pet_name, breed=pet_breed, 
#                                      category=pet_category, gender = pet_gender)
#             return JsonResponse({'status': 200, 'success': True, 'userId': user_id, 'petName': pet_name, 
#                                  'breed': pet_breed, 'category': pet_category, 'gender': pet_gender})
#             # return JsonResponse({'status': 200, 'success': True, 'pet_info': pet.objects.all()})
#             return JsonResponse({'status': 200, 'success': True, 'message': '寵物添加成功'})
#         except Exception as e:
#             return JsonResponse({'status': 500, 'success': False, 'message': str(e)})

#     return JsonResponse({'status': 400, 'success': False, 'message': '只接受POST請求'})

# @csrf_exempt
# def delete_pet(request):
#     if request.method == 'POST':
#         user_id = request.POST['userId']
#         pet_id = request.POST['petId']
#         # 驗證和處理輸入...

#         try:
#             pet = Pet.objects.get(id=pet_id, owner__uid=user_id)  # 假設Pet模型中有一個外鍵指向Users模型的uid字段
#             pet.delete()
#             return JsonResponse({'status': 200, 'success': True, 'message': '寵物刪除成功'})
#         except Pet.DoesNotExist:
#             return JsonResponse({'status': 404, 'success': False, 'message': '寵物不存在'})
#         except Exception as e:
#             return JsonResponse({'status': 500, 'success': False, 'message': str(e)})

#     return JsonResponse({'status': 400, 'success': False, 'message': '只接受POST請求'})







