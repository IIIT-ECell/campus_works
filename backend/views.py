from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseServerError, JsonResponse
from django.contrib.auth import login
from backend.models import CustomUser, Student
import json
# Create your views here.

def register_student(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        try:
            data = json_data['data']
        except KeyError:
            HttpResponseServerError("Malformed Data")
        email = data['email']
        password = data['password']
        if email is None or password is None:
            HttpResponseServerError("No email or password given")
        if CustomUser.objects.get(email=email) is not None:
            HttpResponseServerError("Email already exists")
        new_student = Student(
            name = data['name'],
            email = email,
            phone_number = data['phone_number'],
            profile_picture = data['profile_picture'],
            student_id = data['student_id'],
            gender = data['gender'],
            applications = data['applications'],
            resume = data['resume'],
        )