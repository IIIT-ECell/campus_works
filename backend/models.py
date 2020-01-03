from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

'''
Model description for Student and Company users. The users are an extension of
Django's default AbstractUser so as to further use built in features available
through the framework.
Generic workflow used: https://simpleisbetterthancomplex.com/tutorial/2018/01/18/how-to-implement-multiple-user-types-with-django.html
'''

class CustomUser(AbstractUser):

    USER_TYPE_CHOICES = (
        (1, 'Student'),
        (2, 'Company'),
        (3, 'Admin'),
    )
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default=1)
    phone_number = models.CharField(blank=False, max_length=15)
    email = models.CharField(blank=False, max_length=100)


class Student(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)

    MALE = 'M'
    FEMALE = 'F'
    OTHER = 'O'
    NOT_SAY = 'N'
    GENDER_CHOICES = (
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (OTHER, 'Other'),
        (NOT_SAY, 'Prefer not to say'),
    )

    Y1 = '1'
    Y2 = '2'
    Y3 = '3'
    Y4 = '4'
    Y5 = '5'

    YEAR_OF_STUDY_CHOICES = (
        (Y1, 'First Year Undergrad'),
        (Y2, 'Second Year Undergrad'),
        (Y3, 'Third Year Undergrad'),
        (Y4, 'Fourth Year Undergrad'),
        (Y5, 'Postgrads (5th year DD, PG+))'),
    )

    student_id = models.CharField(blank=False, max_length=10)
    gender = models.CharField(blank=False,max_length=2,choices=GENDER_CHOICES)
    year_of_study = models.CharField(blank=False,max_length=1,choices=YEAR_OF_STUDY_CHOICES)
    resume = models.CharField(blank=False,max_length=100)

    def get_student(self):
        """
        This view should return the student with a particular user_id
        """
        user_id = self.kwargs['user_id']
        return Student.objects.filter(user_id=user_id)

    def __str__(self):
        return self.email

class Company(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    
    poc_name = models.CharField(blank=False, max_length=255, default="")
    name = models.CharField(blank=False, max_length=255, default="")
    company_id = models.CharField(blank=False, max_length=255)
    about = models.CharField(blank=False, max_length=1000)
    logo = models.CharField(blank=True, max_length=255)
    
class Jobs(models.Model):
    job_name = models.CharField(blank=False,max_length=255)
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    description = models.TextField(blank=False)
    skill = models.CharField(max_length=50)
    job_start_date = models.DateField(blank=False)
    job_duration = models.IntegerField(blank=False)
    stipend = models.IntegerField(blank=False)
    language = models.CharField(max_length=50)
    status = models.BooleanField(blank=False, default=True)

class Applications(models.Model):
    job_id = models.ForeignKey(Jobs, on_delete=models.CASCADE)
    student_id = models.ForeignKey(Student, on_delete=models.CASCADE)
    date_of_application = models.DateField(blank=False)
    status = models.BooleanField(blank=False, default=True)

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
