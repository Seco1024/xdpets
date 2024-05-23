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
    path('user/login/', login_view),
    path('user/signup/', sign_up),
    path('user/addNewPet/', add_new_pet),
    # path('user/getInformation/',get_information),
    path('match/addPreference', addPreference),
    path('match/getPreference', getPreference),
    path('match/deletePreference', deletePreference),
    path('match/updatePreference', updatePreference),
    path('administrator/addAdministrator', addAdministrator),
    path('administrator/loginAdministrator', loginAdministrator),
    path('administrator/deleteAdministrator', deleteAdministrator),
    path('administrator/deletePet', deletePet),
    path('administrator/judgePet', judgePet),
    path('pet/getAllPets/', getAllPets),
    path('pet/getPet/', getPet),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

