from rest_framework import serializers
from .models import Student, CustomUser, Application

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email','first_name','password']

class ApplicationStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['job','student','date_of_application']