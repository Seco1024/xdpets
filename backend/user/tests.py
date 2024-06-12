from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from .models import Profile

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
