from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseServerError, JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth import login
from backend.models import CustomUser, Student, Job
from django.contrib.auth.hashers import make_password

from rest_framework.views import APIView
from rest_framework.response import Response

from backend.decorators import student_required, company_required
import json

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

class PostJobs(APIView):

    def post(self,request):
        data = json.loads(request.body)
        token = data['token']
        if not company_required(token):
           return Response({"message":"You cannot post jobs"}) 
        try: 
            new_job = Job.objects.create(
                job_name = data['job_name'],
                company = data['company'],
                description = data['description']
            )
            new_job.save()
            return Response({"message":"Job added successfully"})
        except Exception as e:
            return Response({"message":str(e)})