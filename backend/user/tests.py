from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from .models import Profile
from pet.models import Pet, PetImage

class ProfileTestCase(TestCase):
    def setUp(self):
        # 創建測試用的 Profile 實例
        Profile.objects.create(
            email='user1@example.com',
            username='user1',
            password='password123',  # 實際應用中應該使用加密過的密碼
            phone='1234567890'
        )
        Profile.objects.create(
            email='user2@example.com',
            username='user2',
            password='password321',  # 實際應用中應該使用加密過的密碼
            phone='0987654321'
        )

    def test_profiles_created(self):
        # 檢查創建的 Profile 是否存在
        user1 = Profile.objects.get(username='user1')
        user2 = Profile.objects.get(username='user2')
        self.assertEqual(user1.email, 'user1@example.com')
        self.assertEqual(user2.email, 'user2@example.com')

    def test_phone_field(self):
        # 驗證電話號碼是否正確
        user1 = Profile.objects.get(username='user1')
        user2 = Profile.objects.get(username='user2')
        self.assertEqual(user1.phone, '1234567890')
        self.assertEqual(user2.phone, '0987654321')

class SignUpTest(TestCase):
    def setUp(self):
        self.client = Client()
    def test_successful_signup(self):
        data = {
            'email': 'testuser@example.com',
            'username': 'testuser',
            'password': 'testpassword',
            'phone': '0912345678'
        }
        response = self.client.post(reverse('signup'), data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 200)
        profile = Profile.objects.get(email='testuser@example.com')
        self.assertTrue(check_password('testpassword', profile.password))
    def test_duplicate_email(self):
        Profile.objects.create(
            email='testuser@example.com', 
            username='testuser1', 
            password='testpassword', 
            phone='0912345678'
        )
        data = {
            'email': 'testuser@example.com',
            'username': 'testuser2',
            'password': 'testpassword',
            'phone': '0912345678'
        }
        response = self.client.post(reverse('signup'), data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['status'], 400)
        self.assertEqual(response.json()['message'], '電子郵件已存在')
    def test_duplicate_username(self):
        Profile.objects.create(
            email='testuser1@example.com', 
            username='testuser', 
            password='testpassword', 
            phone='0912345678'
        )
        data = {
            'email': 'testuser2@example.com',
            'username': 'testuser',
            'password': 'testpassword',
            'phone': '0912345678'
        }
        response = self.client.post(reverse('signup'), data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['status'], 400)
        self.assertEqual(response.json()['message'], '用戶名已存在')
    def test_invalid_password(self):
        # 測試密碼不符合要求的情況，例如太短
        data = {
            'email': 'testuser@example.com',
            'username': 'testuser',
            'password': 'short',  # 太短的密碼
            'phone': '0912345678'
        }
        response = self.client.post(reverse('signup'), data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['status'], 400)
        # 檢查錯誤訊息是否包含密碼要求
        self.assertIn('密碼', response.json()['message'][0]) 

class UserViewsTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.pet = Pet.objects.create(
            name='Test Pet', 
            species='dog', 
            breed='Golden Retriever', 
            age=2, 
            owner=self.user
        )
    def test_login_success(self):
        url = reverse('login')  # 使用 reverse 產生 URL
        response = self.client.post(url, {'username': 'testuser', 'password': 'testpassword'})
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()['success'])
    def test_login_fail(self):
        url = reverse('login')
        response = self.client.post(url, {'username': 'testuser', 'password': 'wrongpassword'})
        self.assertEqual(response.status_code, 400)
        self.assertFalse(response.json()['success'])
    def test_get_information_authenticated(self):
        self.client.login(username='testuser', password='testpassword')
        url = reverse('getInformation')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()['success'])
    def test_get_information_unauthenticated(self):
        url = reverse('getInformation')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 401)  # 或者你預期的錯誤代碼
        self.assertFalse(response()['success'])
    def test_add_new_pet_authenticated(self):
        self.client.login(username='testuser', password='testpassword')
        url = reverse('addNewPet')
        data = {
            'name': 'New Pet',
            'species': 'cat',
            'breed': 'Persian',
            'age': 1
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 201)  # 或者你預期的成功代碼
        self.assertTrue(response.json()['success'])

    def test_add_new_pet_unauthenticated(self):
        url = reverse('addNewPet')
        data = {
            'name': 'New Pet',
            'species': 'cat',
            'breed': 'Persian',
            'age': 1
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 401)  # 或者你預期的錯誤代碼
        self.assertFalse(response.json()['success'])

    def test_delete_pet_authenticated(self):
        self.client.login(username='testuser', password='testpassword')
        url = reverse('deletePet', args=[self.pet.id])  # 注意這裡需要傳入 pet id
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 200)  # 或者你預期的成功代碼
        self.assertTrue(response.json()['success'])

    def test_delete_pet_unauthenticated(self):
        url = reverse('deletePet', args=[self.pet.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 401)  # 或者你預期的錯誤代碼
        self.assertFalse(response.json()['success'])

    def test_update_pet_authenticated(self):
        self.client.login(username='testuser', password='testpassword')
        url = reverse('updatePet', args=[self.pet.id])  # 注意這裡需要傳入 pet id
        data = {
            'name': 'Updated Pet',
            'age': 3
        }
        response = self.client.put(url, data, content_type='application/json')  # 根據你的 API 需求，可能需要指定 content_type
        self.assertEqual(response.status_code, 200)  # 或者你預期的成功代碼
        self.assertTrue(response.json()['success'])

    def test_update_pet_unauthenticated(self):
        url = reverse('updatePet', args=[self.pet.id])
        data = {
            'name': 'Updated Pet',
            'age': 3
        }
        response = self.client.put(url, data, content_type='application/json')
        self.assertEqual(response.status_code, 401)  # 或者你預期的錯誤代碼
        self.assertFalse(response.json()['success'])


