from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseServerError, JsonResponse
from django.views.decorators.http import require_http_methods
from django.core import serializers
from backend.models import CustomUser, Student, Company, Job
from django.contrib.auth.hashers import make_password

from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from backend.decorators import student_required, company_required, get_company_id, get_student_id
import json

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = CustomUser.objects.get(id=token.user_id)
        return Response({'token': token.key, 'id': token.user_id, 'type':user.user_type})


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
                # resume = data['resume'], THis has to become request.FILES
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
        return Response({"success": True, "data": json.loads(job_json)})
        


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
            new_job.save()
            return Response({"message":"Job added successfully"})
        except Exception as e:
            return Response({"message":str(e)})

            # check the person editing the job is the person who posted it


class ViewJobs(APIView):
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



