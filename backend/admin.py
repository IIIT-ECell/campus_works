from django.contrib import admin
from .models import Applications, Jobs, Company, Student, CustomUser

admin.site.register(Applications)
admin.site.register(Jobs)
admin.site.register(Company)
admin.site.register(Student)
admin.site.register(CustomUser)
