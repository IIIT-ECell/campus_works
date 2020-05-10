from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseServerError, JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.static import serve
from django.core import serializers
from backend.models import CustomUser, Student, Company, Job, Application
from django.contrib.auth.hashers import make_password

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from backend.decorators import student_required, company_required, get_company_id, get_student_id
import json
from .serializers import StudentSerializer, UserSerializer, ApplicationStudentSerializer
import os

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        print(token)
        user = CustomUser.objects.get(id=token.user_id)
        print(user)
        return Response({'token': token.key, 'id': token.user_id, 'type':user.user_type})


class UserViews(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def get(self, request, *args, **kwargs):
        user = CustomUser.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)

class StudentViews(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        data = request.GET
        print(data['token'])
        try:
            key = data['token']
        except KeyError as e:
            return Response({"success": False, "message": str(e)})
        
        try:
            token = Token.objects.get(key=key)
            student = Student.objects.get(user_id=token.user_id)
    
        except Student.DoesNotExist as e:
            return Response({"success": False, "message": str(e)})

        student_json = serializers.serialize("json", [student, ])
        print(json.loads(student_json)[0])
        return Response({"success": True, "data": json.loads(student_json)[0]})



    def post(self, request, *args, **kwargs):
        data = request.data
        print(data['password'])
        try:
            email = data['email']
            password = data['password']
            if email is None or password is None:
                return HttpResponseServerError("No email or password given")
            print(email)
            new_user = CustomUser.objects.create_user(
                email = email,
                username = email,
                password = password,
                first_name = data['name'],
                user_type = 1
            )
            print('New user not created')
            new_user.save()
            print('New user created')
            request.data['user']=new_user.id
        except:
            return Response({'message':'Missing data',"success":False})
        student_serializer = StudentSerializer(data=request.data)
        if student_serializer.is_valid():
            student_serializer.save()
            return Response({"message":"Student created successfully","success":True})
        else:
            print('error', student_serializer.errors)
            return Response({"message":student_serializer.errors,"success":False})

class CompanyViews(APIView):

    def get(self,request):
        pass

    def post(self,request):
        data = json.loads(request.body)
        print(data)
        try:
            email = data['email']
            password = data['password']
            if email is None or password is None:
                return Response({"message":"No email or password given","success":"False"})

            new_user = CustomUser.objects.create_user(
                email = email,
                username = email,
                password = password,
                first_name = data['name'],
                user_type = 2,
            )
            new_company = Company.objects.create(
                user_id=new_user.id,    
                phone_number = data['phone_number'],
                poc = data['poc'],
                about = data['about']
            )
            new_company.save()
            return Response({"message":"Company created successfully","success":True})
        except Exception as e:
            return Response({"message":str(e),"success":False})

class ApplicationViews(APIView):
    def get(self, request, *args, **kwargs):
        data = request.GET
        token = data['token']
        if student_required(token):
            return Response({"message":"Students not allowed to see all applications","success":False})
        job = Job.objects.get(id=data['job_id'])
        if get_company_id(token) == job.company_id:
            applications = serializers.serialize('json',Application.objects.filter(job_id=data['job_id']))
            return Response(json.loads(applications))
        else:
            return Response({"message":"You did not post this job","success":False})

    def post(self, request, *args, **kwargs):
        token = request.data['token']
        if not student_required(token):  
            return Response({"message":"Only students can apply for jobs","success":False})
        try:
            check = Application.objects.get(job_id=request.data['job_id'],student_id = get_student_id(token))
            return Response({"message":"You have already applied to this job before","success":False})
        except Exception as e:
            print(str(e))
            # return Response({"message":str(e),"success":False})

            application = Application(
                job_id = request.data['job_id'],
                student_id = get_student_id(token),
                date_of_application = request.data['date_of_application']
            )
            application.save()
            return Response({'message':"Application successfully submitted","success":True})

        # application_serializer = ApplicationStudentSerializer(data=request.data)
        # if application_serializer.is_valid():
        #     application_serializer.save()
        #     return Response({'message':"Application successfully submitted","success":True})
        # else:
        #     return Response({'message':application_serializer.error_messages,"success":False})

    def put(self, request):
        data = json.loads(request.body)
        print(data)
        try:
            token = data['token']
        except KeyError as e:
            return Response({"success": False, "message": str(e)})
        
        if not company_required(token):
            return Response({"success": False, "message": "You cannot select applications"})

        company_id = get_company_id(data['token'])
        application = Application.objects.get(pk=data['application_id'])
        print(application.job.company_id)
        if application.job.company_id == company_id:
            application.select_status = data['select_status']
            application.save()
            return Response({"message":"Application successfully changed","success":True})
        else:
            return Response({"message":"Your company is authorized to this application","status":False})
class PostJob(APIView):

    def get(self, request):
        '''View a single job'''
        #should give all the job details for a given id
        data = request.GET
        try:
            id = data['id']
        except KeyError as e:
            return Response({"success": False, "message": str(e)})

        try:
            job = Job.objects.get(pk=id)
        except Job.DoesNotExist as e:
            return Response({"success": False, "message": str(e)})

        job_json = serializers.serialize("json", [job, ])
        print(json.loads(job_json)[0])
        return Response({"success": True, "data": json.loads(job_json)[0]})
        


    def post(self, request):
        data = json.loads(request.body)
        
        try: 
            token = data['token']
        except KeyError as e:
            return Response({"success": False, "message": str(e)})
        
        if not company_required(token):
            return Response({"success": False, "message": "You cannot post jobs"})

        try:
            id = data['id'] # this is the id of the user
        except KeyError as e:
            return Response({"success": False, "message": str(e)})
        
        try:
            company_id = get_company_id(token)
            new_job = Job(
                company_id = company_id
            )
            keys = data.keys()
            print(data.keys())
            if "job_name" in keys:
                new_job.job_name = data["job_name"]
            if "description" in keys:
                new_job.description = data["description"]
            if "skill" in keys:
                new_job.skill = data["skill"]
            if "start_date" in keys:
                print(data["start_date"])
                new_job.start_date = data["start_date"]
            if "duration" in keys:
                new_job.duration = data["duration"]
            if "stipend" in keys:
                new_job.stipend = data["stipend"]
            if "language" in keys:
                new_job.language = data["language"]
            if "stipend" in keys:
                new_job.stipend = data["stipend"]
            if "num_pos" in keys:
                new_job.num_pos = data["num_pos"]
            new_job.save()
            return Response({"message":"Job added successfully"})
        except Exception as e:
            return Response({"message":str(e)})

    def put(self, request):
        data = json.loads(request.body)
        try: 
            token = data['token']
            if not company_required(token):
                return Response({"message":"You cannot post jobs"}) 
            job_id = data["job_id"]
            new_job = Job.objects.get(id=job_id)
            if not get_company_id(token)==new_job.company_id:
                return Response({"message":"You are not allowed to edit this job"})
            keys = data.keys()
            print(data.keys())
            if "job_name" in keys:
                new_job.job_name = data["job_name"]
            if "description" in keys:
                new_job.description = data["description"]
            if "skill" in keys:
                new_job.skill = data["skill"]
            if "start_date" in keys:
                print(data["start_date"])
                new_job.start_date = data["start_date"]
            if "duration" in keys:
                new_job.duration = data["duration"]
            if "stipend" in keys:
                new_job.stipend = data["stipend"]
            if "language" in keys:
                new_job.language = data["language"]
            if "stipend" in keys:
                new_job.stipend = data["stipend"]
            if "num_pos" in keys:
                new_job.num_pos = data["num_pos"]
            new_job.save()
            return Response({"message":"Job edited successfully"})
        except Exception as e:
            return Response({"message":str(e)})

            # check the person editing the job is the person who posted it


class ViewJobs(APIView):

    def get(self,request):
        # data = json.loads(request.body)
        # print(data)
        # key = data["token"]
        # if not company_required(key):
        #     return Response({"message":"You cannot see jobs"}) 
        jobs = serializers.serialize('json',Job.objects.all())
        return Response(json.loads(jobs))


    def post(self, request):
        '''Gives you multiple jobs'''
        # incomplete
        data = json.loads(request.body)
        print(data)
        key = data["token"]
        token = Token.objects.get(key=key)
        company = Company.objects.get(user_id=token.user_id)
        jobs = serializers.serialize('json',Job.objects.filter(company_id=company.id))
        return Response(json.loads(jobs))


class StudentApplications(APIView):

    def get(self,request):
        data = request.GET
        # print(data)
        token = data['token']
        if not student_required(token):
           return Response({"message":"You cannot apply for jobs"}) 
        try:
            id = get_student_id(token)
            student = Student.objects.get(id=id)
            print(student.resume.path)
            applications = Application.objects.filter(student_id=id)
            serializer = ApplicationStudentSerializer(applications, many=True)
            return Response(serializer.data)
        except:
            Response({"message":"Cannot get application data"})


class Resume(APIView):

    def get(self, request):
        data = request.GET
        student = Student.objects.get(id=data['id'])
        filepath = student.resume.path
        print(filepath)
        return serve(request, os.path.basename(filepath), os.path.dirname(filepath))

class StudentProfile(APIView):
    def get(self, request):
        data = request.GET
        print(data['student_id'])
        student = Student.objects.get(id=data['student_id'])
        student_json = serializers.serialize("json", [student])
        return Response({"success":True, "data":json.loads(student_json)[0]})
        # return json.loads(student_json)


    # def post(self)

    # def put(self)

    # def delete(self)
