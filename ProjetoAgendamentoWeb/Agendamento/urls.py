from django.urls import path
from . import views

urlpatterns = [
    path('', views.homepage, name="home"),         # Inclui as urls do app blog
    path('cadastroUsuario', views.cadastroUsuario, name='cadastroUsuario'),
    path('login', views.login, name='login'),
    path('faq', views.faq, name="faq"),
    path('faqAdmin', views.faqAdmin, name="faqAdmin"),
    path('faqProfessor', views.faqProfessor, name="faqProfessor"),
    path('homepageAdmin', views.homepageAdmin, name='homepageAdmin'),
    path('homepageProfessor', views.homepageProfessor, name='homepageProfessor'),
    path('logout', views.logout_view, name='logout'),
    
    path('loginMobile', views.loginMobile, name='loginMobile'),
    path('cadastroUsuarioMobile', views.cadastroUsuarioMobile, name='cadastroUsuarioMobile'),
    path('homepageAdminMobile', views.homepageAdminMobile, name='homepageAdminMobile'),
    path('homepageProfessorMobile', views.homepageProfessorMobile, name='homepageProfessorMobile'),
    path('faqMobile', views.faqMobile, name='faqMobile'),
    path('faqAdminMobile', views.faqAdminMobile, name='faqAdminMobile'),
    path('faqProfessorMobile', views.faqProfessorMobile, name='faqProfessorMobile'),
]
