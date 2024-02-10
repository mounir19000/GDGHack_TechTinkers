from . import views 
from django.urls import path 
from .views import * 




urlpatterns = [
    
    path("",views.home,name="home"),
    path("signup/",views.signup_page,name="signup") , 
    path("login/",views.LoginPage , name="login"),
    path("ajouter_events/", ajouter_events ,name="ajouter_events"),
    path("get_events/", get_events, name="get_events"),
    path("add_sponsor/", add_sponsor, name="add_sponsor"),
    path("get_sponsors/",get_sponsors, name="get_sponsors"),
    path("add_organizer/<str:event_name>/",add_organizer_to_event, name="add_organizer"),
    path("add_mentor/<event_id>/",add_mentor, name="add_mentor"),
    path("get_event_ids/",get_event_ids, name="get_event_ids"),
]
