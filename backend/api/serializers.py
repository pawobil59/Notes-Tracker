from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"passsword": {"write_only": True}} #password cannot be read when JSON is returned


    def create (self, validated_data):
        user = User.objects.create(**validated_data)
        return user