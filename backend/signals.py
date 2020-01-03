from django.db.models.signals import post_save
from django.dispatch import receiver

from django.conf import settings
from .models import Student

from datetime import datetime
import os


@receiver(post_save, sender=Student)
def update_student_resume(instance, created, **kwargs):

    if created:  # checks if it is a new object

        initial_path = instance.resume.path
        
        new_path = f'uploads/student/resume/{instance.user.pk}{os.path.splitext(initial_path)[1]}'

        os.makedirs(os.path.dirname(new_path), exist_ok=True)
        os.rename(initial_path, new_path)
        instance.resume = new_path
        instance.save()

@receiver(post_save, sender=Company)
def update_company_logo(instance, created, **kwargs):

    if created:  # checks if it is a new object

        initial_path = instance.logo.path

        new_path = f'uploads/company/logo/{instance.user.pk}{os.path.splitext(initial_path)[1]}'

        os.makedirs(os.path.dirname(new_path), exist_ok=True)
        os.rename(initial_path, new_path)
        instance.resume = new_path
        instance.save()

@receiver(post_save, sender=Application)
def update_application_resume(instance, created, **kwargs):
    if created:  # checks if it is a new object

        initial_path = instance.resume.path
        
        new_path = f'uploads/application/resume/{instance.pk}{os.path.splitext(initial_path)[1]}'

        os.makedirs(os.path.dirname(new_path), exist_ok=True)
        os.rename(initial_path, new_path)
        instance.resume = new_path
        instance.save()
        
@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.user_type==1:
            Student.objects.create(user=instance)
        else:
            Company.objects.create(user=instance)

@receiver(post_save, sender=CustomUser)
def save_user_profile(sender, instance, **kwargs):
    if instance.user_type==1:
        instance.student.save()
    else:
        instance.company.save()