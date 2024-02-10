from django.shortcuts import render
import json
from django.conf import settings
from rest_framework.viewsets import ModelViewSet
from django.conf import settings
import os
from django.utils import timezone
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
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404

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
            user_Nom= data.get('Nom')
            user_Prenom = data.get('Prenom')
            email = data.get('Email')
            pass1 = data.get('MotdePasse1')
            pass2 = data.get('MotdePasse2')
            discord_id = data.get('discord_id')
        
            
            # Vérifier l'unicité du pseudo
            if CustomUser.objects.filter(username=discord_id).exists():
                return JsonResponse({"error": "This username is already taken"}, status=400)

            # Vérifier si l'e-mail est valide
            if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                return JsonResponse({"error": "Invalid email address"}, status=401)

            # Vérifier si l'e-mail existe déjà dans la base de données
            if CustomUser.objects.filter(email=email).exists():
                return JsonResponse({"error": "This email is already registered"}, status=402)

            if pass1 != pass2:
                return JsonResponse({"error": "Your password and confirm password are not the same!!"}, status=403)
            

            my_user = CustomUser.objects.create_user(username=discord_id,email=email,  password=pass1 )
            my_user.discord_id = discord_id
            my_user.user_Nom = user_Nom
            my_user.user_Prenom = user_Prenom 
            
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
            email = data.get('Email')
            password = data.get('MotdePasse')

            if email is None or password is None:
                return JsonResponse({"message": "Adresse e-mail ou mot de passe manquant"}, status=400)

            # Authenticate user with email and password
            user = authenticate(request, email=email, password=password)

            if user is not None:
                login(request, user)
                # Include CSRF token and email in the response
                csrf_token = get_token(request)
                return JsonResponse({"message": "Authentification réussie", "csrftoken": csrf_token, "id": user.id })
            else:
                return JsonResponse({"message": "Adresse e-mail ou mot de passe incorrect"}, status=401)

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
    
#8- update etat event 

def update_event_state():
    now = timezone.now().date()
    events_before = Event.objects.filter(date_start__gt=now)
    events_on_going = Event.objects.filter(date_start__lte=now, date_end__gte=now)
    events_after = Event.objects.filter(date_end__lt=now)

    for event in events_before:
        event.state = 'before'
        event.save()

    for event in events_on_going:
        event.state = 'on_going'
        event.save()

    for event in events_after:
        event.state = 'after'
        event.save()

#9- ajouter un evenement 
@api_view(['POST'])
@csrf_exempt
def ajouter_events(request):
    # Charger les données JSON depuis le corps de la requête
    data = json.loads(request.body)
    
    # Extraire les champs spécifiques de la requête
    nom = data.get('nom')
    description = data.get('description')
    type_event = data.get('type_event')
    date_start = data.get('date_start')
    date_end = data.get('date_end')
    location = data.get('location')
    
    # Créer un dictionnaire pour les données de l'événement
    event_data = {
        
        'nom': nom,
        'description': description,
        'type_event': type_event,
        'date_start': date_start,
        'date_end': date_end,
        'location': location , 
    }
    
    # Créer un serializer pour valider et désérialiser les données
    serializer = EventSerializer(data=event_data)
    
    # Valider les données et créer l'événement si les données sont valides
    if serializer.is_valid():
        try:
            event = serializer.save()
             # Appeler la fonction pour mettre à jour l'état des événements
            return Response(serializer.data, status=201)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
    else:
        # Renvoyer les erreurs de validation au client
        return Response(serializer.errors, status=400)
    
#10- afficher tous les events 

@api_view(['GET'])
@csrf_exempt
def get_events(request):
    events = Event.objects.all()
    serialized_events = []
    for event in events:
        if event.state == 'after':
            serialized_events.append(EventAfterSerializer(event).data)
        else:
            serialized_events.append(EventSerializer(event).data)
    return Response(serialized_events)
    
#11- ajouter un sponsor 

@api_view(['POST'])
@csrf_exempt

def add_sponsor(request):
    # Récupérer les données du corps de la requête
    data = request.data

    # Sérialiser les données pour valider et désérialiser
    serializer = SponsorSerializer(data=data)

    if serializer.is_valid():
        # Créer un nouvel objet Sponsor avec les données fournies
        sponsor = serializer.save()

        # Retourner une réponse indiquant que le sponsor a été ajouté avec succès
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        # Retourner une réponse d'erreur avec les détails des erreurs de validation
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#12 - afficher les sponsors   
  
@api_view(['GET'])
@csrf_exempt

def get_sponsors(request):
    # Récupérer tous les sponsors de la base de données
    sponsors = Sponsor.objects.all()

    # Sérialiser les sponsors récupérés
    serializer = SponsorSerializer(sponsors, many=True)

    # Retourner la liste des sponsors sérialisés dans la réponse
    return Response(serializer.data)    
 

#13- ajouter un organizer 

@api_view(['POST'])
@csrf_exempt

def add_organizer_to_event(request, event_name):
    
    # Récupérer les données de la requête
    data = request.data
    
    # Extraire les informations sur l'utilisateur de la requête
    user_data = data.get('user', {})  # Assurez-vous que 'user' est présent dans les données de la requête
    
    # Créer un utilisateur avec les données fournies
    user_serializer = CustomUserSerializer(data=user_data)
    
    if user_serializer.is_valid():
        # Sauvegarder l'utilisateur
        user = user_serializer.save()
    else:
        # Retourner une réponse d'erreur si les données de l'utilisateur sont invalides
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Récupérer l'objet Event en fonction de son nom
    event = get_object_or_404(Event, nom=event_name)
    
    # Créer un organisateur avec l'utilisateur créé précédemment et d'autres données
    organizer_data = {
        'user': user.id,  # Utiliser l'ID de l'utilisateur
        'department': data.get('department'),
        'working_hours': data.get('working_hours'),
        'tasks_to_do': data.get('tasks_to_do'),
    }
    organizer_serializer = OrganizerSerializer(data=organizer_data)
    
    if organizer_serializer.is_valid():
        # Sauvegarder l'organisateur
        organizer = organizer_serializer.save()
        # Ajouter l'organisateur à l'événement
        event.organisateurs.add(organizer)
        event.save()
        # Serializer l'événement mis à jour et renvoyer la réponse
        event_serializer = EventSerializer(event)
        return Response(event_serializer.data, status=status.HTTP_200_OK)
    else:
        # Retourner une réponse d'erreur si les données de l'organisateur sont invalides
        return Response(organizer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['GET'])
def get_event_ids(request):
    # Récupérer tous les événements de la base de données
    events = Event.objects.all()
    
    # Extraire les IDs des événements
    event_ids = [event.id for event in events]
    
    # Retourner la liste des IDs des événements
    return Response(event_ids, status=status.HTTP_200_OK)

#15-ajouter mentor 

def add_mentor(request, event_id):
    
    data = request.data
    user_id = data.get('user_id')  # Supposons que vous envoyiez l'ID de l'utilisateur dans la requête

    # Vérifiez si l'utilisateur existe
    user = get_object_or_404(User, pk=user_id)

    # Vérifiez si l'événement existe
    event = get_object_or_404(Event, pk=event_id)

    # Créez l'organisateur en utilisant l'utilisateur existant et l'événement
    mentor = Mentor.objects.create(user=user, event=event)
    
    serializer =MentorSerializer(mentor)
    
    return Response(serializer.data, status=status.HTTP_201_CREATED)




# 16 - consulter event

