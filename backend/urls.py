"""campus_works URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from backend import views 
from rest_framework.authtoken.views import obtain_auth_token

appname = "backend"

urlpatterns = [
    path('user',views.UserViews.as_view()),
    path('student', views.StudentViews.as_view()), 
    path('company', views.CompanyViews.as_view()), 
    path('authenticate', views.CustomObtainAuthToken.as_view(), name='api_token_auth'),
    path('post-job',views.PostJob.as_view()),
    path('apply-for-job',views.ApplyForJob.as_view()),
    path('jobs',views.ViewJobs.as_view())
]
