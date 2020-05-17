from rest_framework import serializers
from .models import Student, CustomUser, Application, Job, Company

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
        fields = ['student_id','job_id','date_of_application','select_status']
    
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'
        
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'
        depth = 2 

class JobCompanySerializer(serializers.Serializer):
    company = CompanySerializer()
    job = JobSerializer()









    