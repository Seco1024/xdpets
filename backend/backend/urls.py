from django.contrib import admin
from django.urls import path
from user.views import *
from match.views import *
from administrator.views import *
from pet.views import *
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),

    # User
    path('user/login/', login_view, name='login'),
    # path('user/getId/', get_uid),
    path('user/signup/', sign_up, name='signup'),
    path('user/getInformation/', get_information, name='getInformation'),  # login required
    path('user/addNewPet/', add_new_pet, name='addNewPet'),  # login required
    path('user/deletePet/', delete_pet, name='deletePet'),  # login required
    path('user/updatePet/', update_pet, name='updatePet'),  # login required

    # Match
    path('match/addPreference', addPreference, name='addPreference'),  # login required
    path('match/getPreference', getPreference, name='getPreference'),  # login required
    path('match/deletePreference', deletePreference, name='deletePreference'),  # login required
    path('match/updatePreference', updatePreference, name='updatePreference'),  # login required

    # Administrator
    path('administrator/addAdministrator', addAdministrator, name='addAdministrator'),  # neglect
    path('administrator/loginAdministrator', loginAdministrator, name='loginAdministrator'),  # neglect
    path('administrator/deleteAdministrator', deleteAdministrator, name='deleteAdministrator'),  # neglect
    path('administrator/deletePet', deletePet, name='adminDeletePet'),  # superuser required
    path('administrator/judgePet', judgePet, name='judgePet'),  # superuser required
    path('administrator/getJudgedPets', getJudgedPets, name='getJudgedPets'),  # superuser required
    path('administrator/getUnjudgedPets', getUnjudgedPets, name='getUnjudgedPets'),  # superuser required
    path('administrator/getAllUsers', getAllUsers, name='getAllUsers'),
    path('administrator/checkIsAdmin', checkIsAdmin, name='checkisAdmin'),

    # Pet
    path('pet/getAllPets/', getAllPets, name='getAllPets'),
    path('pet/getPet/', getPet, name='getPet'),
    path('pet/getMyPets/', getMyPets, name='getMyPets'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
