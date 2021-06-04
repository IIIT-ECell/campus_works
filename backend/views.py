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

from backend.decorators import (
    student_required,
    company_required,
    get_company_id,
    get_student_id,
)
import json
from .serializers import (
    JobSerializer,
    UserSerializer,
    StudentSerializer,
    CompanySerializer,
    ApplicationStudentSerializer,
    user_filter,
)
import os
import copy


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data["token"])

        user = CustomUser.objects.get(id=token.user_id)

        return Response(
            {"token": token.key, "id": token.user_id, "type": user.user_type}
        )


class UserViews(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        user = CustomUser.objects.all()
        serializer = UserSerializer(user, many=True)

        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        data = json.loads(request.body)
        token = request.auth

        if token is None:
            return HttpResponseServerError("No token given")
        if "password" not in data:
            return HttpResponseServerError("No new password given")

        token = Token.objects.get(key=request.auth)
        user = CustomUser.objects.get(id=token.user_id)
        user.set_password(data["password"])
        user.save()

        return Response({"message": "Password changed successfully", "success": True})


class StudentViews(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        data = request.GET
        try:
            key = request.auth
        except KeyError as e:
            return Response({"success": False, "message": str(e)})

        try:
            token = Token.objects.get(key=key)
            student = Student.objects.get(user_id=token.user_id)
        except Student.DoesNotExist as e:
            return Response({"success": False, "message": str(e)})

        student_json = serializers.serialize("json", [student,])
        return Response({"success": True, "data": json.loads(student_json)[0]})

    def post(self, request, *args, **kwargs):
        data = copy.deepcopy(request.data)
        if "email" not in data or "password" not in data or "name" not in data:
            return HttpResponseServerError("No email, password or name not given")
        try:
            email = data["email"]
            password = data["password"]
            new_user = CustomUser.objects.create_user(
                email=email,
                username=email,
                password=password,
                first_name=data["name"],
                user_type=1,
            )
            new_user.save()
            data["user"] = new_user.id
        except Exception as e:
            return Response({"message": [str(e)], "success": False})
        student_serializer = StudentSerializer(data=data)
        if student_serializer.is_valid():
            student_serializer.save()
            return Response(
                {"message": "Student created successfully", "success": True}
            )
        else:
            user = CustomUser.objects.get(username=data["email"])
            user.delete()
            return Response({"message": student_serializer.errors, "success": False})


class CompanyViews(APIView):
    def get(self, request, *args, **kwargs):
        data = request.GET
        try:
            key = request.auth
        except KeyError as e:
            return Response({"success": False, "message": str(e)})

        try:
            token = Token.objects.get(key=key)
            company = Company.objects.get(user_id=token.user_id)

        except Company.DoesNotExist as e:
            return Response({"success": False, "message": str(e)})

        company_json = serializers.serialize("json", [company,])
        return Response({"success": True, "data": json.loads(company_json)[0]})

    def post(self, request):
        data = json.loads(request.body)
        try:
            email = data["email"]
            password = data["password"]
            if email is None or password is None:
                return Response(
                    {"message": "No email or password given", "success": "False"}
                )

            new_user = CustomUser.objects.create_user(
                email=email,
                username=email,
                password=password,
                first_name=data["name"],
                user_type=2,
            )
            new_company = Company.objects.create(
                user_id=new_user.id,
                phone_number=data["phone_number"],
                poc=data["poc"],
                about=data["about"],
            )
            new_company.save()
            return Response(
                {"message": "Company created successfully", "success": True}
            )
        except Exception as e:
            return Response({"message": str(e), "success": False})


class ApplicationViews(APIView):
    def get(self, request, *args, **kwargs):
        data = request.GET
        token = request.auth
        if student_required(token):
            return Response(
                {
                    "message": "Students not allowed to see all applications",
                    "success": False,
                }
            )
        job = Job.objects.get(id=data["job_id"])
        if get_company_id(token) == job.company_id:
            applications = serializers.serialize(
                "json", Application.objects.filter(job_id=data["job_id"])
            )
            return Response(json.loads(applications))
        else:
            return Response({"message": "You did not post this job", "success": False})

    def post(self, request, *args, **kwargs):
        token = request.auth
        if not student_required(token):
            return Response(
                {"message": "Only students can apply for jobs", "success": False}
            )
        try:
            check = Application.objects.get(
                job_id=request.data["job_id"], student_id=get_student_id(token)
            )
            return Response(
                {
                    "message": "You have already applied to this job before",
                    "success": False,
                }
            )
        except Exception as e:
            # return Response({"message":str(e),"success":False})

            application = Application(
                job_id=request.data["job_id"],
                student_id=get_student_id(token),
                date_of_application=request.data["date_of_application"],
            )
            application.save()
            return Response(
                {"message": "Application successfully submitted", "success": True}
            )

        # application_serializer = ApplicationStudentSerializer(data=request.data)
        # if application_serializer.is_valid():
        #     application_serializer.save()
        #     return Response({'message':"Application successfully submitted","success":True})
        # else:
        #     return Response({'message':application_serializer.error_messages,"success":False})

    def put(self, request):
        data = json.loads(request.body)
        try:
            token = request.auth
        except KeyError as e:
            return Response({"success": False, "message": str(e)})

        if not company_required(token):
            return Response(
                {"success": False, "message": "You cannot select applications"}
            )

        company_id = get_company_id(token)
        application = Application.objects.get(pk=data["application_id"])
        if application.job.company_id == company_id:
            application.select_status = data["select_status"]
            application.save()
            return Response(
                {"message": "Application successfully changed", "success": True}
            )
        else:
            return Response(
                {
                    "message": "Your company is authorized to this application",
                    "status": False,
                }
            )


class PostJob(APIView):
    def get(self, request):
        """View a single job"""
        # should give all the job details for a given id
        data = request.GET
        try:
            id = data["id"]
        except KeyError as e:
            return Response({"success": False, "message": str(e)})

        try:
            job = Job.objects.get(pk=id)
        except Job.DoesNotExist as e:
            return Response({"success": False, "message": str(e)})

        job_json = serializers.serialize("json", [job,])
        return Response({"success": True, "data": json.loads(job_json)[0]})

    def post(self, request):
        data = json.loads(request.body)

        try:
            token = request.auth
        except KeyError as e:
            return Response({"success": False, "message": str(e)})

        if not company_required(token):
            return Response({"success": False, "message": "You cannot post jobs"})

        try:
            id = data["id"]  # this is the id of the user
        except KeyError as e:
            return Response({"success": False, "message": str(e)})

        try:
            company_id = get_company_id(token)
            new_job = Job(company_id=company_id)
            keys = data.keys()
            if "job_name" in keys:
                new_job.job_name = data["job_name"]
            if "description" in keys:
                new_job.description = data["description"]
            if "skill" in keys:
                new_job.skill = data["skill"]
            if "start_date" in keys:
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
            return Response({"message": "Job added successfully"})
        except Exception as e:
            return Response({"message": str(e)})

    def put(self, request):
        data = json.loads(request.body)
        try:
            token = request.auth
            if not company_required(token):
                return Response({"message": "You cannot post jobs"})
            job_id = data["job_id"]
            new_job = Job.objects.get(id=job_id)
            if not get_company_id(token) == new_job.company_id:
                return Response({"message": "You are not allowed to edit this job"})
            keys = data.keys()
            if "job_name" in keys:
                new_job.job_name = data["job_name"]
            if "description" in keys:
                new_job.description = data["description"]
            if "skill" in keys:
                new_job.skill = data["skill"]
            if "start_date" in keys:
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
            return Response({"message": "Job edited successfully", "success": True})
        except Exception as e:
            return Response({"message": str(e), "success": False})

            # check the person editing the job is the person who posted it


class ViewJobs(APIView):
    def get(self, request):
        # data = json.loads(request.body)
        # key = data["token"]
        # if not company_required(key):
        #     return Response({"message":"You cannot see jobs"})
        jobs = Job.objects.prefetch_related("company").all()
        job_serializer = JobSerializer(jobs, many=True)
        return Response(job_serializer.data)

    def post(self, request):
        key = request.auth        
        if key is None:
            return HttpResponseServerError("No token given")
        token = Token.objects.get(key=key)
        company = Company.objects.get(user_id=token.user_id)
        jobs = serializers.serialize("json", Job.objects.filter(company_id=company.id))
        return Response(json.loads(jobs))


class StudentApplications(APIView):
    def get(self, request):
        data = request.GET
        token = request.auth
        if not student_required(token):
            return Response({"message": "You cannot apply for jobs", "success": False})
        try:
            id = get_student_id(token)
            student = Student.objects.get(id=id)
            applications = Application.objects.filter(student_id=id)
            serializer = ApplicationStudentSerializer(applications, many=True)
            return Response(serializer.data)
        except:
            Response({"message": "Cannot get application data", "success": False})


class Resume(APIView):
    def get(self, request):
        data = request.GET
        id = int(data["id"])
        val = int((id-148017)**0.5)
        student = Student.objects.get(id=val)
        filepath = student.resume.path
        return serve(request, os.path.basename(filepath), os.path.dirname(filepath))


class StudentProfile(APIView):
    def get(self, request):
        data = request.GET
        try:
            stud_id = int(data["student_id"])
            val = int((stud_id-340629)**0.5)
            student = Student.objects.get(id=val)
            user = student.user
            student_json = json.loads(serializers.serialize("json", [student]))[0]
            user_json = json.loads(serializers.serialize("json", [user]))[0]
            user_json = user_filter(user_json)

            return Response(
                {"success": True, "student": student_json, "user": user_json,}
            )
        except Exception as e:
            return Response({"success": False, "data": str(e)})

        # return json.loads(student_json)

    def put(self, request):
        data = copy.deepcopy(request.data)
        token = request.auth

        if token is None:
            return Response({"success": False, "message": "Auth token not found"})

        if not student_required(token):
            return Response(
                {
                    "success": False,
                    "message": "You don't have enough privileges to edit this",
                },
                status=403,
            )

        student_id = get_student_id(token)

        if student_id != int(data["student_id"]):
            return Response(
                {
                    "success": False,
                    "message": "You can not edit someone else's profile",
                },
                status=403,
            )

        student = Student.objects.get(id=student_id)
        user = student.user

        if "first_name" in data:
            user.first_name = data["first_name"]

        cleaned_data = {}

        for editable in ["phone_number", "year_of_study", "gender", "resume"]:
            if editable in data:
                cleaned_data[editable] = data[editable]

        serializer = StudentSerializer(student, data=cleaned_data, partial=True)

        if serializer.is_valid():
            user.save()
            serializer.save()
            return Response(
                {"message": "The given fields have been edited", "success": True}
            )

        return Response({"message": serializer.errors, "success": False})


class CompanyProfile(APIView):
    def get(self, request):
        data = request.GET
        try:
            comp_id = int(data["student_id"])
            val = int((comp_id-458069)**0.5)
            company = Company.objects.get(id=val)
            user = company.user
            company_json = json.loads(serializers.serialize("json", [company]))[0]
            user_json = json.loads(serializers.serialize("json", [user]))[0]
            user_json = user_filter(user_json)

            return Response(
                {"success": True, "company": company_json, "user": user_json,}
            )
        except Exception as e:
            return Response({"success": False, "data": str(e)})

    def put(self, request):
        data = json.loads(request.body)
        token = request.auth

        if token is None:
            return Response({"success": False, "message": "Auth token not found"})

        if not company_required(token):
            return Response(
                {
                    "success": False,
                    "message": "You don't have enough privileges to edit this",
                },
                status=403,
            )

        company_id = get_company_id(token)

        if company_id != data["company_id"]:
            return Response(
                {
                    "success": False,
                    "message": "You can not edit someone else's profile",
                },
                status=403,
            )

        company_details = data["company"]
        user_details = data["user"]

        company = Company.objects.get(id=company_id)
        user = company.user

        if "first_name" in user_details:
            user.first_name = user_details["first_name"]

        if "poc" in company_details:
            company.poc = company_details["poc"]

        if "about" in company_details:
            company.about = company_details["about"]

        user.save()
        company.save()

        return Response({"message": "writable fields have been edited"})

    # def delete(self)
