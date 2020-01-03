from django.contrib import admin
from .models import Application, Job, Company, Student, CustomUser

admin.site.register(Application)
admin.site.register(Job)
admin.site.register(Company)
admin.site.register(Student)
admin.site.register(CustomUser)
