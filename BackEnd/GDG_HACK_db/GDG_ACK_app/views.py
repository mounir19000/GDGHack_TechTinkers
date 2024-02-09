from django.shortcuts import render
import json
from django.conf import settings
from rest_framework.viewsets import ModelViewSet
from django.conf import settings
import os
import hashlib
from django.middleware.csrf import get_token
from django.shortcuts import render
from rest_framework.decorators import api_view,parser_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
# Create your views here.from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status ,generics
from django.contrib.auth import authenticate, login
from django.http import Http404,HttpResponse , JsonResponse
import json
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, update_session_auth_hash
from .serializers import ChangePasswordSerializer
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.http import JsonResponse
import requests
import re
from rest_framework.authentication import BasicAuthentication 
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import update_session_auth_hash
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseServerError
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
import traceback
from django.contrib.auth import get_user_model
import random
import string
from django.core.mail import send_mail
import secrets
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import RequestPasswordResetCodeSerializer, ResetPasswordSerializer
from django.db import models
from . import utils 
from GDG_ACK_app.utils import send_email
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from django.shortcuts import render
from django.db.models import Q
from datetime import datetime
#from .utils import get_existing_article_ids
import secrets
import string
from django.core.mail import send_mail
from django.contrib.auth.models import Group
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_protect
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django.shortcuts import render
from rest_framework.decorators import api_view,parser_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
# Create your views here.
from django.core.mail import send_mail
from . import utils 
from pathlib import Path
import json
import os.path
# Create your views here.


#authentification google 
def authenticate_google(request):
    
    # Configure the OAuth flow
    flow = InstalledAppFlow.from_client_secrets_file(
        'path/to/client_secret.json',  # Replace with the path to your client_secret.json file
        scopes=['https://www.googleapis.com/auth/gmail.send']
    )

    # Run the OAuth flow and get the credentials
    credentials = flow.run_local_server(port=0)

    # Save the credentials for later use
    with open('path/to/token.json', 'w') as token_file:  # Replace with the path to your token.json file
        token_file.write(credentials.to_json())

    return HttpResponse("Authentication successful!")

# Create your views here.
def home(request):
    return render(request,'home.html')

# 1- foction sign up 

CustomUser = get_user_model()
# sign up 
@csrf_exempt
def signup_page(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            uname = data.get('Pseudo')
            email = data.get('Email')
            pass1 = data.get('MotdePasse1')
            pass2 = data.get('MotdePasse2')

            # Vérifier l'unicité du pseudo
            if CustomUser.objects.filter(username=uname).exists():
                return JsonResponse({"error": "This username is already taken"}, status=400)

            # Vérifier si l'e-mail est valide
            if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                return JsonResponse({"error": "Invalid email address"}, status=401)

            # Vérifier si l'e-mail existe déjà dans la base de données
            if CustomUser.objects.filter(email=email).exists():
                return JsonResponse({"error": "This email is already registered"}, status=402)

            if pass1 != pass2:
                return JsonResponse({"error": "Your password and confirm password are not the same!!"}, status=403)
            

            my_user = CustomUser.objects.create_user(uname, email, pass1)
            my_user.save()

            return JsonResponse({"message": "User created successfully!"}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

    return JsonResponse({"message": "Method not allowed"}, status=405)
# se connecter 
@csrf_exempt
def LoginPage(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('Pseudo')
            password = data.get('MotdePasse')

            # Authenticate regular user
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                # Include CSRF token and email in the response
                csrf_token = get_token(request)
                return JsonResponse({"message": "Authentification réussie", "csrftoken": csrf_token, "email": user.email, "id": user.id})
            else:
                # If regular authentication fails, try with Moderateur
                moderator = Moderateur.objects.filter(username=username).first()
                if moderator and moderator.check_password(password):
                    login(request, moderator)
                    csrf_token = get_token(request)
                    return JsonResponse({"message": "Authentification en tant que modérateur réussie", "csrftoken": csrf_token, "email": moderator.email})
                else:
                    return JsonResponse({"message": "Nom d'utilisateur ou mot de passe incorrect"}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({"message": "Format JSON invalide"}, status=400)

    return JsonResponse({"message": "Méthode non autorisée"}, status=405)
    
    
# 3- deconnnexion de l'utilisateur 
@csrf_exempt
#@login_required
def LogoutPage(request):
    if request.method == 'POST':
        try:
            # Déconnexion de l'utilisateur
            logout(request)
            return JsonResponse({"message": "Déconnexion réussie"})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Méthode non autorisée"}, status=405)

#4- modifier le mot de passe 

@api_view(['POST'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
@login_required
def change_password(request):
    current_user = request.user
    serializer = ChangePasswordSerializer(data=request.data)

    if serializer.is_valid():
        old_password = serializer.validated_data.get('old_password')
        new_password = serializer.validated_data.get('new_password')

        # Verify the old password
        if not current_user.check_password(old_password):
            return Response({'message': 'Ancien mot de passe incorrect'}, status=status.HTTP_400_BAD_REQUEST)

        # Change the password
        current_user.set_password(new_password)
        current_user.save()

        # Update the authenticated session
        update_session_auth_hash(request, current_user)

        return Response({'message': 'Mot de passe modifié avec succès'}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# 5- modifier user name 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_username(request):
    current_user = request.user
    new_username = request.data.get('new_username')

    # Vérifier si le nouveau pseudonyme est déjà pris
    if User.objects.filter(username=new_username).exists():
        return Response({'message': 'Ce pseudonyme est déjà pris'}, status=status.HTTP_400_BAD_REQUEST)

    # Changer le pseudonyme
    current_user.username = new_username
    current_user.save()

    return Response({'message': 'Pseudonyme modifié avec succès'}, status=status.HTTP_200_OK)


#6 - supprimer un compte 

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_account(request):
    try:
        current_user = request.user

        # Supprimer l'utilisateur
        current_user.delete()

        return Response({'message': 'Compte utilisateur supprimé avec succès'}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# 7- Mot de passe  oublie 

@csrf_exempt
def request_password_reset_code(request):
    data = json.loads(request.body)
    email = data.get('email')

    if email:
        user = get_object_or_404(User, email=email)

        # Assurez-vous que l'utilisateur a un objet Profile associé
        profile, created = Profile.objects.get_or_create(user=user)

        # Générez un code de réinitialisation
        reset_code = secrets.token_hex(16)
       
        # Enregistrez le code de réinitialisation dans le modèle Profile
        profile.reset_code = reset_code
        profile.save()

        # Envoyez le code de réinitialisation par e-mail
        email_data = {
            'email_subject': 'Code de réinitialisation du mot de passe',
            'email_body': f'Votre code de réinitialisation du mot de passe est {reset_code}',
            'to_email': user.email
        }

        utils.send_email(email_data)

        return JsonResponse({'message': 'Code de réinitialisation envoyé avec succès.'})
    else:
        return JsonResponse({'message': 'Adresse e-mail non fournie.'}, status=400)

@csrf_exempt
def reset_password(request):
    # Charger les données JSON depuis le corps de la requête
    data = json.loads(request.body)
    email = data.get('email')
    reset_code = data.get('reset_code')
    new_password = data.get('new_password')

    try:
        # Recherchez l'utilisateur par adresse e-mail
        user = User.objects.get(email=email)

        try:
            # Vérifiez si l'utilisateur a un profil
            profile = user.profile

            # Vérifier le code de réinitialisation
            if profile.reset_code != reset_code:
                return JsonResponse({'message': 'Code de réinitialisation invalide.'}, status=400)

            # Mettre à jour le mot de passe
            user.set_password(new_password)
            user.save()

            return JsonResponse({'message': 'Mot de passe réinitialisé avec succès.'})
        except ObjectDoesNotExist:
            return JsonResponse({'message': 'L\'utilisateur n\'a pas de profil associé.'}, status=400)

    except User.DoesNotExist:
        return JsonResponse({'message': 'Aucun utilisateur trouvé avec cette adresse e-mail.'}, status=400)

#8- ajouter un evenement 

    
    
    
    
    
#9- ajouter un sponsor 






#10- ajouter un organizer 





#11- ajouter un particpant 




#12-ajouter mentor 





#13- afficher departements 




#14  afficher  events 









#15- ajouter un feedback   