from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import  Group, Permission
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models import Model
# Create your models here.


 # 1- modele d'utilisateur 
class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, username, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    groups = models.ManyToManyField(Group, related_name='custom_user_groups', blank=True, through='UserGroup')
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_permissions', blank=True, through='UserPermission')

class UserGroup(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

class UserPermission(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)
    
#2- modele de admin 
class Admin(AbstractUser):
    groups = models.ManyToManyField(Group, related_name='moderateur_groups', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='moderateur_user_permissions', blank=True)
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.username  
    
   
#3- Organizer 
class Organizer (models.Model):



    def __str__(self):
        return self.username 

#4- mentor 
class Montor  (models.Model):



    def __str__(self):
        return self.username 


#5-event     
class Event (models.Model):



    def __str__(self):
        return self.username 



#6-Sponsor 
class Sponsor (models.Model):



    def __str__(self):
        return self.username 
    
#7- modele departement 
class Departement  (models.Model):



    def __str__(self):
        return self.username    
    
    
#8- Mes events 




#9-mes inscriptions 




    
  