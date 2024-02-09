# TP_IGL_app/serializers.py
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers


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
  