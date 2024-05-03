from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() #List of objects for creating a new user
    serializer_class = UserSerializer #data needed to create user
    permission_classes = [AllowAny] #who can call this view to create a new user
