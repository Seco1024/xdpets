from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from django.urls import reverse
from .models import Preference, Profile
import json

class PreferenceModelTests(TestCase):
    def setUp(self):
        # Create a user profile to use in our tests
        self.profile = Profile.objects.create(username="test_user")

        # Create a preference instance
        self.preference = Preference.objects.create(
            uid=self.profile,
            breed="Labrador",
            category="Dog",
            gender="Male",
            size="Large",
            region="Taiwan",
            age=5,
            coat_color="Black",
            ligated=True
        )

    def test_preference_creation(self):
        self.assertTrue(isinstance(self.preference, Preference))
        self.assertEqual(self.preference.__str__(), self.preference.category)

class PreferenceViewTests(TestCase):
    def setUp(self):
        # Create a user profile to use in our tests
        self.profile = Profile.objects.create(username="test_user")

        # Create a preference instance
        self.preference = Preference.objects.create(
            uid=self.profile,
            breed="Labrador",
            category="Dog",
            gender="Male",
            size="Large",
            region="Taiwan",
            age=5,
            coat_color="Black",
            ligated=True
        )

        session = self.client.session
        session['uid'] = str(self.preference.uid)
        session.save()

    def test_add_preference(self):
        url = reverse("addPreference")
        data = {
            'userId': str(self.profile.uid),
            'PreferenceInfo': {
                'breed': 'Beagle',
                'category': 'Dog',
                'gender': 'Female',
                'size': 'Medium',
                'region': 'Taiwan',
                'age': 3,
                'coat_color': 'Brown',
                'ligated': False
            }
        }
        response = self.client.post(url, json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, 201)
    
    def test_get_preference_success(self):
        response = self.client.get(reverse('getPreference'), {'uid': self.profile}, content_type='application/json')
        print(response)
        self.assertEqual(response.status_code, 200)
        #self.assertEqual(len(response.json()['preferences']), 1)

    def test_no_preferences_found(self):
        response = self.client.get(reverse('getPreference'), {'userId': 'unknown'}, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()['preferences']), 0)

    def test_invalid_json(self):
        response = self.client.get(reverse('getPreference'), {'userId': '{badjson}'}, content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_profile_not_found(self):
        # Assuming Profile.DoesNotExist is handled internally
        response = self.client.get(reverse('getPreference'), {'userId': 'nonexistentuser'}, content_type='application/json')
        self.assertEqual(response.status_code, 404)



    def test_update_preference(self):
        url = reverse('updatePreference')
        data = {
            'preferenceId': str(self.preference.preferenceId),
            'userId': str(self.profile.uid),
            'matchInfo': {
                'age': 6
            }
        }
        response = self.client.post(url, json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.preference.refresh_from_db()
        self.assertEqual(self.preference.age, 6)

    def test_delete_preference(self):
        url = reverse('deletePreference')
        data = {
            'preferenceId': str(self.preference.preferenceId),
            'userId': str(self.profile.uid)
        }
        response = self.client.post(url, json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        with self.assertRaises(Preference.DoesNotExist):
            Preference.objects.get(preferenceId=self.preference.preferenceId)


