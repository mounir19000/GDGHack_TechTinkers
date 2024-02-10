# TP_IGL_app/serializers.py
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from rest_framework import serializers
from .models import *



class ChangePasswordSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class RequestPasswordResetCodeSerializer(serializers.Serializer):
    email = serializers.EmailField()

class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    reset_code = serializers.CharField()
    new_password = serializers.CharField()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
       
        
        fields = ['user_id', 'user_email', 'user_Nom', 'user_Prenom', 'user_discord_id', 'is_active', 'is_staff', 'user_is_inter']  


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['nom', 'description', 'type_event', 'date_start', 'date_end' , 'state']      


class EventAfterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['nom', 'description', 'type_event', 'date_start', 'date_end', 'duration', 'state', 'winners']       


class  SponsorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sponsor
        fields = ['nom_entreprise',  'email_contact', 'numero_contact', 'horaires_contact']        


class OrganizerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizer
        fields = ['user', 'department','working_hours', 'tasks_to_do']    
        

class MentorSerializer(serializers.ModelSerializer):
    class Meta:
        model =Mentor
        fields = ['user_id', 'user_email', 'user_Nom', 'user_Prenom', 'user_discord_id', 'is_active', 'is_staff', 'user_is_inter','department','working_hours']                      