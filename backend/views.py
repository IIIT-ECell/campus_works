from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseServerError, JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth import login
from backend.models import CustomUser, Student 
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
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
            # if CustomUser.objects.get(email=email) is not None:
            #     return HttpResponseServerError("Email already exists")

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

