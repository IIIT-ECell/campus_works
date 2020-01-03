from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import RegexValidator
from .validators import FileValidator

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

    phone_validate = RegexValidator(
        regex=r'^\d{10}$', message="Enter your 10 digit phone number without country codes and symbols")

    phone_number = models.CharField(blank=False, max_length=10, validators=[phone_validate,])

    student_id = models.CharField(blank=False, max_length=10)
    gender = models.CharField(blank=False,max_length=1,choices=GENDER_CHOICES)
    year_of_study = models.CharField(blank=False,max_length=1,choices=YEAR_OF_STUDY_CHOICES)
    resume_validate = FileValidator(
        max_size=50*1024*1024, content_types=('application/pdf', ))

    resume = models.FileField(validators=[resume_validate])

    def __str__(self):
        return self.user.name

class Company(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    
    phone_validate = RegexValidator(
        regex=r'^\d{10}$', message="Enter your 10 digit phone number without country codes and symbols")

    phone_number = models.CharField(blank=False, max_length=10, validators=[phone_validate,])

    poc = models.CharField(blank=False, max_length=255, default="", verbose_name="person of contact")
    about = models.TextField(blank=False, max_length=1000)
    logo = models.ImageField()
    
class Job(models.Model):
    job_name = models.CharField(blank=False,max_length=255)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    description = models.TextField(blank=False)
    skill = models.TextField(verbose_name="skills required", max_length=50)
    start_date = models.DateField(blank=False)
    duration = models.IntegerField(blank=False)
    is_flexi = models.BooleanField(verbose_name="flexible start and end date", null=False, default=False)
    stipend = models.IntegerField(blank=False)
    language = models.CharField(verbose_name="Programming languages",max_length=50)
    is_active = models.BooleanField(blank=False, default=True)

class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date_of_application = models.DateTimeField(blank=False, auto_now_add=True)

    APPLICATION_RECEIVED = 'RCVD'
    PASSED_SCREENING = 'SCRN'
    INTERVIEWED = 'INTD'
    ACCEPTED = 'ACPT'
    REJECTED = 'RJCT'
    FLAGGED = 'FLAG'

    ACCEPT_STATUS_CHOICES = [
        (APPLICATION_RECEIVED, 'Application received'),
        (PASSED_SCREENING, 'Passed screening'),
        (INTERVIEWED, 'Interviewed'),
        (ACCEPTED, 'Accepted'),
        (REJECTED, 'Rejected'),
        (FLAGGED, 'Flagged'),
    ]

    select_status = models.CharField('selection status', choices=ACCEPT_STATUS_CHOICES, default=APPLICATION_RECEIVED, max_length=4);

    resume_validate = FileValidator(
        max_size=50*1024*1024, content_types=('application/pdf', ))
    resume = models.FileField(validators=[resume_validate, ])