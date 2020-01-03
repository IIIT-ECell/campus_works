from django.db.models.signals import post_save
from django.dispatch import receiver

from django.conf import settings
from .models import Student

from datetime import datetime
import os


@receiver(post_save, sender=Student)
def update_file_path(instance, created, **kwargs):

    if created:  # checks if it is a new object

        initial_path = instance.resume.path
        
        new_path = f'uploads/resume/{instance.user.pk}{os.path.splitext(initial_path)[1]}'

        os.makedirs(os.path.dirname(new_path), exist_ok=True)
        os.rename(initial_path, new_path)
        instance.resume = new_path
        instance.save()

@receiver(post_save, sender=Company)
def update_file_path(instance, created, **kwargs):

    if created:  # checks if it is a new object

        initial_path = instance.logo.path

        new_path = f'uploads/company/{instance.user.pk}{os.path.splitext(initial_path)[1]}'

        os.makedirs(os.path.dirname(new_path), exist_ok=True)
        os.rename(initial_path, new_path)
        instance.resume = new_path
        instance.save()
        
