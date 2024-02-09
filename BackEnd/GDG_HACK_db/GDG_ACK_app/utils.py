import threading
from django.core.mail import EmailMessage
import secrets
import string
from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth.models import Group
from django.views.decorators.csrf import csrf_exempt
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.db import transaction

def send_email_to_moderator(moderator_mail,moderator_username):
    subject="IMPORTANT NOTIFICATION "
    message=f'Dear {moderator_username} new article has been uploaded , be ready to moderate it'
    from_email=settings.EMAIL_HOST_USER
    recipient_list=[moderator_mail]
    send_mail(subject,message,from_email,recipient_list)
class EmailThread(threading.Thread):

    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()


def send_email(data):
        email = EmailMessage(
            subject=data['email_subject'], body=data['email_body'], to=[data['to_email']])
        thread = EmailThread(email)
        thread.start()
        thread.join()  # Attend que le thread soit terminé, si nécessaire
        
   