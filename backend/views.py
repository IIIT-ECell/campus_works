from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseServerError, JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth import login
from backend.models import CustomUser, Student 
from django.contrib.auth.hashers import make_password
import json
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

@require_http_methods(['POST','GET','PUT'])
@csrf_exempt
def student(request):
    if request.method == 'POST':
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
                password = password,
                # password2 = password
            )

            new_student = Student.objects.create(
                user=new_user,    
                phone_number = data['phone_number'],
                student_id = data['student_id'],
                gender = data['gender'],
                resume = data['resume'],
            )
            new_student.save()

            return JsonResponse({"message":"Student created successfully"},safe=True)
        except Exception as e:
            return HttpResponseServerError(str(e))
    if request.method == 'PUT':
        pass

