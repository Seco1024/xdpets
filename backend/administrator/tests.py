from django.test import TestCase

# Create your tests here.
from django.test import TestCase, Client
from django.urls import reverse
from django.utils import timezone
from django.contrib.auth.hashers import make_password
from administrator.models import Administrator
from pet.models import Pet
from user.models import Profile
import uuid
import json

class AdminModelTests(TestCase):
    def setUp(self):
        self.user = Profile.objects.create(
            email='testuser@example.com',
            username='testuser',
            password=make_password('12345'),
            phone='1234567890',
            uid=uuid.uuid4(),
            date=timezone.now()
        )
    
    def test_create_admin(self):
        user_profile = Profile.objects.get(uid=self.user.uid)
        admin = Administrator.objects.create(
            admin_uid = uuid.uuid4(),
            user_id = user_profile,
            admin_name = 'admin',
            password = make_password('adminpassword'),
            email = self.user.email
        )
        self.assertEqual(admin.admin_name, 'admin')
        self.assertEqual(admin.user_id.uid, self.user.uid)


class AdminAPITests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = Profile.objects.create(
            email='testuser@example.com',
            username='testuser',
            password=make_password('12345'),
            phone='1234567890',
            uid=uuid.uuid4(),
            date=timezone.now()
        )
        user_profile = Profile.objects.get(uid=self.user.uid)
        self.admin = Administrator.objects.create(
            admin_uid = uuid.uuid4(),
            user_id = user_profile,
            admin_name = 'admin',
            password = make_password('adminpassword'),
            email = self.user.email
        )
        self.pet = Pet.objects.create(
            pet_id=uuid.uuid4(),
            pet_name='月月',
            breed='橘貓',
            category='貓',
            gender='母',
            size='大型',
            region='新竹市 東區',
            age='23',
            coat_color='橘色',
            ligated=False,
            post_date=timezone.now(),
            info='活潑親人，現在在清華大學 DA Lab 每天當第一個和最後一個進出實驗室的可憐貓貓',
            owner=self.user,
            legal=None
        )
        # self.client.force_login(self.admin)
        session = self.client.session
        session['uid'] = str(self.user.uid)
        session.save()

    def test_deletePet_success(self):
        response = self.client.post(
            reverse('adminDeletePet'),
            json.dumps({'petId': str(self.pet.pet_id), 'adminId': str(self.admin.admin_uid)}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['message'], 'Pet deleted successfully.')

    def test_deletePet_not_found(self):
        response = self.client.post(
            reverse('adminDeletePet'),
            json.dumps({'petId': str(uuid.uuid4()), 'adminId': str(self.admin.admin_uid)}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()['message'], 'Pet not found.')

    def test_deletePet_invalid_json(self):
        response = self.client.post(
            reverse('adminDeletePet'),
            'invalid json',
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['message'], 'Invalid JSON.')

    def test_judgePet_success(self):
        response = self.client.put(
            reverse('judgePet'),
            json.dumps({'petId': str(self.pet.pet_id), 'isLegal': True, 'adminId': str(self.admin.admin_uid)}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['message'], 'Pet updated successfully.')

    def test_judgePet_not_found(self):
        response = self.client.put(
            reverse('judgePet'),
            json.dumps({'petId': str(uuid.uuid4()), 'isLegal': True, 'adminId': str(self.admin.admin_uid)}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()['message'], 'Pet not found.')


    def test_getJudgedPets_success(self):
        response = self.client.get(reverse('getJudgedPets'))
        self.assertEqual(response.status_code, 200)
        pet_list_length = len(response.json()['petList'])
        self.pet.legal = True
        self.pet.save()
        response_new = self.client.get(reverse('getJudgedPets'))
        self.assertEqual(len(response_new.json()['petList']), pet_list_length + 1)


    def test_getUnjudgedPets_success(self):
        response = self.client.get(reverse('getUnjudgedPets'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()['petList']), 1)

    def test_getAllUsers_success(self):
        response = self.client.get(reverse('getAllUsers'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()['userList']), 1)
