from rest_framework.authtoken.models import Token
from backend.models import *


def student_required(key):
    token = Token.objects.get(key=key)
    user = CustomUser.objects.get(id=token.user_id)
    if user.user_type == 1:
        return True
    return False


def company_required(key):
    token = Token.objects.get(key=key)
    user = CustomUser.objects.get(id=token.user_id)
    if user.user_type == 2:
        return True
    return False


def get_student_id(key):
    token = Token.objects.get(key=key)
    student = Student.objects.get(user_id=token.user_id)
    return student.id


def get_company_id(key):
    token = Token.objects.get(key=key)
    company = Company.objects.get(user_id=token.user_id)
    return company.id
