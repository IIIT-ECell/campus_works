from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseServerError, JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth import login
from backend.models import CustomUser, Student, Company, Job
from django.contrib.auth.hashers import make_password

from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from backend.decorators import student_required, company_required
import json

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})


class StudentViews(APIView):

    def get(self,request):
        pass

    def post(self,request):
        data = json.loads(request.body)
        print(data)
        try:
            email = data['email']
            password = data['password']
            if email is None or password is None:
                return HttpResponseServerError("No email or password given")

            new_user = CustomUser.objects.create_user(
                email = email,
                username = email,
                password = password
            )

            new_student = Student.objects.create(
                user=new_user,    
                phone_number = data['phone_number'],
                student_id = data['student_id'],
                gender = data['gender'],
                resume = data['resume'],
            )
            new_student.save()
            return Response({"message":"User created successfully"})
        except Exception as e:
            return Response({"message":str(e)})

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
                return HttpResponseServerError("No email or password given")

            new_user = CustomUser.objects.create_user(
                email = email,
                username = email,
                password = password,
                first_name = data['name'],
                user_type = 2,
            )

            new_company = Company.objects.create(
                user=new_user,    
                phone_number = data['phone_number'],
                poc = data['poc'],
                about = data['about'],
                # resume = data['logo'],
            )
            new_company.save()
            return Response({"message":"Company created successfully"})
        except Exception as e:
            return Response({"message":str(e)})

class PostJob(APIView):

    def post(self,request):
        data = json.loads(request.body)
        try: 
            token = data['token']
            if not company_required(token):
                return Response({"message":"You cannot post jobs"}) 
            company = Company.objects.get(user_id=data['id'])
            new_job = Job.objects.create(
                job_name = data['job_name'],
                company = company,
                start_date = data['start_date'],
                duration = data['duration'],
                stipend = data['stipend'],
                description = data['description']
            )
            new_job.save()
            return Response({"message":"Job added successfully"})
        except Exception as e:
            return Response({"message":str(e)})


class ApplyForJob(APIView):

    def post(self,request):
        data = json.loads(request.body)
        token = data['token']
        if not student_required(token):
           return Response({"message":"You cannot apply for jobs"}) 
        try: 
            user = CustomUser.objects.get(id=data['id'])
            print(user.student_id)
            # new_job = Job.objects.create(
            #     job_name = data['job_name'],
            #     company = data['company'],
            #     description = data['description']
            # )
            # new_job.save()
            return Response({"message":"Job added successfully"})
        except Exception as e:
            return Response({"message":str(e)})