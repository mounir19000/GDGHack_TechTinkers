from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.contrib.auth.models import AbstractBaseUser ,PermissionsMixin , BaseUserManager
from django.core.validators import RegexValidator 

class CustomUserManager(BaseUserManager):
    
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    
    user_id = models.BigAutoField(primary_key=True)
    email = models.EmailField(unique=True)
    user_Nom = models.CharField(max_length=50)
    user_Prenom = models.CharField(max_length=50)
    user_discord_id = models.CharField(max_length=100, blank=True, null=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    user_is_inter = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    groups = models.ManyToManyField(Group, related_name='custom_user_groups', blank=True, through='UserGroup')
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_permissions', blank=True, through='UserPermission')

class UserGroup(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

class UserPermission(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)

class Organizer(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    department_choices = [
        ('LOG', 'Logistics'),
        ('COM', 'Communications'),
        ('MAR', 'Marketing'),
        ('DEV', 'Development'),
        ('UI/UX', 'UI/UX'),
        ('HR', 'Human Resources'),
        ('MUL', 'Multimedia'),
        ('DES', 'Design'),
    ]
    department = models.CharField(max_length=6, choices=department_choices)
    working_hours = models.CharField(max_length=100)
    tasks_to_do = models.JSONField(default=list)

    def __str__(self):
        return f"{self.user.user_Nom} {self.user.user_Prenom}"

class Task(models.Model):
    organizer = models.ForeignKey(Organizer, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name     

class Mentor(CustomUser):
    department_choices = [
        ('LOG', 'Logistics'),
        ('COM', 'Communications'),
        ('MAR', 'Marketing'),
        ('DEV', 'Development'),
        ('UI/UX', 'UI/UX'),
        ('HR', 'Human Resources'),
        ('MUL', 'Multimedia'),
        ('DES', 'Design'),
    ]
    department = models.CharField(max_length=6, choices=department_choices)
    working_hours = models.CharField(max_length=100)
    Mentor_groups = models.ManyToManyField(Group, related_name='Mentor_set_groups', blank=True)
    Mentor_permissions = models.ManyToManyField(Permission, related_name='Mentor_set_permissions', blank=True)
    Mentor_phone_regex = RegexValidator(regex=r'^0[567]\d{8}$', message="Le numéro de téléphone doit commencer par 05, 06 ou 07 et contenir 10 chiffres.")
    Mentor_phone_number = models.CharField(max_length=10, validators=[Mentor_phone_regex], unique=True)

    def __str__(self):
        return f"{self.user_Nom} {self.user_Prenom}"

class Sponsor(models.Model):
    nom_entreprise = models.CharField(max_length=100)
    email_contact = models.EmailField()
    numero_contact = models.CharField(max_length=15)
    horaires_contact = models.CharField(max_length=100)

    def __str__(self):
        return self.nom_entreprise

class Event(models.Model):
    TYPE_CHOICES = [
        ('Ideathon', 'Ideathon'),
        ('Hackathon', 'Hackathon'),
    ]
    STATE_CHOICES = [
        ('before', 'Before'),
        ('on_going', 'On Going'),
        ('after', 'After'),
    ]
    nom = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    type_event = models.CharField(max_length=10, choices=TYPE_CHOICES)
    participants = models.ManyToManyField(CustomUser, related_name='events_participated', blank=True)
    organisateurs = models.ManyToManyField(CustomUser, related_name='events_organised', blank=True)
    sponsors = models.ManyToManyField(Sponsor, related_name='events_sponsored', blank=True)
    mentors = models.ManyToManyField(Mentor, related_name='events_mentored', blank=True)
    photo_agenda = models.ImageField(upload_to='agenda_photos/', blank=True)
    date_start = models.DateField()
    date_end = models.DateField()
    winners = models.TextField()
    location = models.TextField()
    cahier_de_charge = models.URLField(blank=True)
    drive_pictures_link = models.URLField(blank=True)
    submission_link = models.URLField(blank=True)
    duration = models.CharField(max_length=50, blank=True)
    state = models.CharField(max_length=10, choices=STATE_CHOICES, default='before')

    def __str__(self):
        return self.nom

class Participant(CustomUser):
    Nmr_assurance = models.CharField(max_length=10)
    Participant_phone_regex = RegexValidator(regex=r'^0[567]\d{8}$', message="Le numéro de téléphone doit commencer par 05, 06 ou 07 et contenir 10 chiffres.")
    Participant_phone_number = models.CharField(max_length=10, validators=[Participant_phone_regex], unique=True)

    def __str__(self):
        return f"{self.user_Nom} {self.user_Prenom}"
