"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from user.views import *
from match.views import *
from administrator.views import *
from pet.views import *
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),

    # User
    path('user/login/', login_view),
    # path('user/getId/', get_uid),
    path('user/signup/', sign_up),
    path('user/getInformation/', get_information),  # login required
    path('user/addNewPet/', add_new_pet),  # login required
    path('user/deletePet/', delete_pet),  # login required
    path('user/updatePet/', update_pet),  # login required

    # Match
    path('match/addPreference', addPreference),  # login required
    path('match/getPreference', getPreference),  # login required
    path('match/deletePreference', deletePreference),  # login required
    path('match/updatePreference', updatePreference),  # login required

    # Administrator
    path('administrator/addAdministrator', addAdministrator),  # neglect
    path('administrator/loginAdministrator', loginAdministrator),  # neglect
    path('administrator/deleteAdministrator', deleteAdministrator),  # neglect
    path('administrator/deletePet', deletePet),  # superuser required
    path('administrator/judgePet', judgePet),  # superuser required
    path('administrator/getJudgedPets', getJudgedPets),  # superuser required
    path('administrator/getUnjudgedPets',
         getUnjudgedPets),  # superuser required
    path('administrator/getAllUsers', getAllUsers),  

    # Pet
    path('pet/getAllPets/', getAllPets),
    path('pet/getPet/', getPet),
    path('pet/getAllMyPet/getMyPets/', getMyPets),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
