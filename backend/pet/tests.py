from django.test import TestCase, Client
from django.urls import reverse
from django.utils import timezone
from django.contrib.auth.hashers import make_password
from pet.models import Pet, PetImage
from user.models import Profile
import uuid

class PetModelTests(TestCase):
    def setUp(self):
        self.user = Profile.objects.create(
            email='testuser@example.com',
            username='testuser',
            password=make_password('12345'),
            phone='1234567890',
            uid=uuid.uuid4(),
            date=timezone.now()
        )

    def test_create_pet(self):
        pet = Pet.objects.create(
            pet_id='033333666fa8e61684ef42cd45dbcb98',
            pet_name='蛋皮',
            breed='柴犬',
            category='狗',
            gender='公',
            size='中型',
            region='高雄市 苓雅區',
            age='5',
            coat_color='黑',
            ligated=True,
            post_date=timezone.now(),
            info='活潑親人，因要回南部與家人同住不再在外租屋，其不能飼養寵物，懇請好心人給他一個溫暖的家，不限地區，有心就好。謝謝',
            owner=self.user,
            legal=True
        )
        self.assertEqual(pet.pet_name, 'Buddy')
        self.assertTrue(pet.legal)

    def test_create_pet_image(self):
        pet = Pet.objects.create(
            pet_id='0b6dc4a7686febc7bfe688d9eaa94b1e',
            pet_name='東東',
            breed='米克斯',
            category='狗',
            gender='母',
            size='大型',
            region='台中市 北區',
            age='3',
            coat_color='黃白',
            ligated=True,
            post_date=timezone.now(),
            info='因家裡有長輩生病，無法兼顧',
            owner=self.user,
            legal=True
        )
        pet_image = PetImage.objects.create(
            pet=pet,
            image='pet_images/test_image.jpg'
        )
        self.assertEqual(pet_image.pet.pet_name, '東東')

    def test_authenticate_user(self):
        self.assertTrue(self.user.authenticate('12345'))
        self.assertFalse(self.user.authenticate('wrong_password'))

class PetViewTests(TestCase):
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
        self.pet = Pet.objects.create(
            pet_id='033333666fa8e61684ef42cd45dbcb98',
            pet_name='蛋皮',
            breed='柴犬',
            category='狗',
            gender='公',
            size='中型',
            region='高雄市 苓雅區',
            age='5',
            coat_color='黑',
            ligated=True,
            post_date=timezone.now(),
            info='活潑親人，因要回南部與家人同住不再在外租屋，其不能飼養寵物，懇請好心人給他一個溫暖的家，不限地區，有心就好。謝謝',
            owner=self.user,
            legal=True
        )
        self.pet_image = PetImage.objects.create(
            pet=self.pet,
            image='pet_images/test_image.jpg'
        )

    def test_getAllPets(self):
        response = self.client.get(reverse('getAllPets'))
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()['success'])
        self.assertEqual(len(response.json()['allPetInformation']), 1)

    def test_getPet(self):
        response = self.client.get(reverse('getPet'), {'pet_id': '1'})
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()['success'])
        self.assertEqual(response.json()['PetInformation']['pet_id'], '1')

    def test_getPet_not_found(self):
        response = self.client.get(reverse('getPet'), {'pet_id': '999'})
        self.assertEqual(response.status_code, 404)
        self.assertFalse(response.json()['success'])
        self.assertEqual(response.json()['message'], 'Pet not found')

    def test_getMyPets(self):
        response = self.client.get(reverse('getMyPets'), {'user_id': str(self.user.uid)})
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()['success'])
        self.assertEqual(len(response.json()['PetInformation']), 1)

    def test_getMyPets_not_found(self):
        response = self.client.get(reverse('getMyPets'), {'user_id': '999'})
        self.assertEqual(response.status_code, 404)
        self.assertFalse(response.json()['success'])
        self.assertEqual(response.json()['message'], 'No pets found for this user')

    def test_login(self):
        response = self.client.post(reverse('login'), {
            'email': 'testuser@example.com',
            'password': '12345'
        })
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()['success'])
        self.assertEqual(response.json()['user']['username'], 'testuser')

    def test_login_failed(self):
        response = self.client.post(reverse('login'), {
            'email': 'testuser@example.com',
            'password': 'wrong_password'
        })
        self.assertEqual(response.status_code, 401)
        self.assertFalse(response.json()['success'])
        self.assertEqual(response.json()['message'], 'Invalid credentials')
