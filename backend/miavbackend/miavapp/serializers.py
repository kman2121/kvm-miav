from django.contrib.auth import get_user_model
from rest_framework import serializers

from miavapp.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'last_login', 'phone', 'usertype')
        read_only_fields = ('last_login',)

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    def create(self, validated_data):
        return get_user_model().objects.create_user(**validated_data)

    def validate(self, data):
        if data.get('password', 0) != data.get('confirm_password', 1):
            raise serializers.ValidationError("Passwords do not match.")
        return data

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'date_created', 'phone', 'password', 'confirm_password')
        read_only_fields = ('date_created',)

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ('id', 'year', 'make', 'model', 'license')

class PassengerSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Passenger
        fields = ('id', 'user')
        read_only_fields = ('user',)

class RegisterPassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = ('id', 'user')

class PointSerializer(serializers.Serializer):
    lat = serializers.FloatField()
    lon = serializers.FloatField()

class DriverSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    vehicle = VehicleSerializer(many=False, read_only=True)
    # location = PointSerializer(lat=self.location_lat, lon=self.location_long)

    class Meta:
        model = Driver
        fields = ('id', 'user', 'vehicle', 'location')
        read_only_fields = ('user', 'vehicle')

class RegisterDriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = ('id', 'user', 'vehicle')

class RatingSerializer(serializers.ModelSerializer):
    passenger = PassengerSerializer(many=False)
    driver = DriverSerializer(many=False)

    class Meta:
        model = Rating
        fields = ('id', 'passenger', 'driver', 'rating')

class JobSerializer(serializers.ModelSerializer):
    passenger = PassengerSerializer(many=False, read_only=True)

    class Meta:
        model = Job
        fields = ('id', 'passenger', 'start_time', 'end_time', 'max_price', 'num_boxes', 'description', 'job_type', 'status', 'job_loc')

class JobWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('id', 'passenger', 'start_time', 'end_time', 'max_price', 'num_boxes', 'description', 'job_type', 'status', 'job_loc_lat', 'job_loc_long')

class TripSerializer(serializers.ModelSerializer):
    driver = DriverSerializer(many=False)
    job = JobSerializer(many=False)
    # start_loc = PointSerializer(lat=self.start_loc_lat, lon=self.start_loc_lon)
    # end_loc = PointSerializer(lat=self.end_loc_lat, lon=self.end_loc_long)

    class Meta:
        model = Trip
        fields = ('id', 'driver', 'job', 'start_loc', 'end_loc', 'start_time', 'end_time')
