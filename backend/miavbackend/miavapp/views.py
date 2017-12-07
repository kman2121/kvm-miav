from datetime import datetime
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import filters, status, generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from rest_framework_jwt.utils import jwt_encode_handler

from miavapp.models import *
from miavapp.serializers import *
from miavapp.utils import jwt_response, jwt_payload_handler

class ApiRoot(APIView):
    def get(self, request, format=None):
        return Response({
            'login': reverse('login', request=request, format=format),
            'verify': reverse('verify-token', request=request, format=format),
            'drivers': reverse('drivers-list', request=request, format=format),
            'passengers': reverse('passengers-list', request=request, format=format),
            'jobs': reverse('jobs-list', request=request, format=format),
            'trips': reverse('trips-list', request=request, format=format),
            'ratings': reverse('ratings-list', request=request, format=format)
        })

# Drivers
class DriverList(generics.ListCreateAPIView):
    def get_queryset(self):
        return Driver.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return RegisterDriverSerializer
        else:
            return DriverSerializer

    def create(self, request, *args, **kwargs):
        data = request.data

        user_serializer = register({
            'username': data.get('user.username'),
            'phone': data.get('user.phone'),
            'password': data.get('user.password'),
            'confirm_password': data.get('user.confirm_password')
        })

        vehicle_serializer = VehicleSerializer(data={
            'year': data.get('vehicle.year'),
            'make': data.get('vehicle.make'),
            'model': data.get('vehicle.model'),
            'license': data.get('vehicle.license')
        })

        if user_serializer.is_valid() and vehicle_serializer.is_valid():
            user = user_serializer.save()
            vehicle = vehicle_serializer.save()

            serializer = self.get_serializer(data={
                'user': user.id,
                'vehicle': vehicle.id
            })
            if serializer.is_valid(raise_exception=False):
                serializer.save()

                payload = jwt_payload_handler(user)
                token = jwt_encode_handler(payload)
                return Response({'token': token, 'driver': DriverSerializer(serializer.instance).data}, status.HTTP_201_CREATED)
            else:
                user.delete()
                vehicle.delete()
                return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
        elif not user_serializer.is_valid():
            return Response(user_serializer.errors, status.HTTP_400_BAD_REQUEST)
        elif not vehicle_serializer.is_valid():
            return Response(vehicle_serializer.errors, status.HTTP_400_BAD_REQUEST)

class DriverDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DriverSerializer
    def get_queryset(self):
        return Driver.objects.all()

# Passengers
class PassengerList(generics.ListCreateAPIView):
    def get_queryset(self):
        return Passenger.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return RegisterPassengerSerializer
        else:
            return PassengerSerializer

    def create(self, request, *args, **kwargs):
        data = request.data

        user_serializer = register({
            'username': data.get('user.username'),
            'phone': data.get('user.phone'),
            'password': data.get('user.password'),
            'confirm_password': data.get('user.confirm_password')
        })

        if user_serializer.is_valid():
            user = user_serializer.save()

            serializer = self.get_serializer(data={'user': user.id})
            if serializer.is_valid(raise_exception=False):
                serializer.save()

                payload = jwt_payload_handler(user)
                token = jwt_encode_handler(payload)
                return Response({'token': token, 'passenger': PassengerSerializer(serializer.instance).data}, status.HTTP_201_CREATED)
            else:
                user.delete()
                return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
        else:
            return Response(user_serializer.errors, status.HTTP_400_BAD_REQUEST)

class PassengerDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PassengerSerializer
    def get_queryset(self):
        return Passenger.objects.all()

# Jobs
class JobList(generics.ListCreateAPIView):
    filter_backends = (filters.DjangoFilterBackend, )
    filter_fields = ('passenger',)

    def get_queryset(self):
        return Job.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return JobWriteSerializer
        else:
            return JobSerializer

    def create(self, request, *args, **kwargs):
        if request.user.usertype != 'passenger':
            return HttpResponse('Only passengers may post jobs', status=status.HTTP_400_BAD_REQUEST)

        data = request.data.dict()
        data['passenger'] = request.user.passenger.id
        data['status'] = 'pending'
        serializer = self.get_serializer(data=data)

        if serializer.is_valid(raise_exception=False):
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

class JobDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = JobSerializer
    def get_queryset(self):
        return Job.objects.all()

# Trips
class TripList(generics.ListCreateAPIView):
    serializer_class = TripSerializer
    def get_queryset(self):
        return Trip.objects.all()

class TripDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TripSerializer
    def get_queryset(self):
        return Trip.objects.all()

# Ratings
class RatingList(generics.ListCreateAPIView):
    filter_backends = (filters.DjangoFilterBackend, )
    filter_fields = ('driver',)

    serializer_class = RatingSerializer

    def get_queryset(self):
        return Rating.objects.all()

    def create(self, request, *args, **kwargs):
        if request.user.usertype != 'passenger':
            return HttpResponse('Only passengers may post jobs', status=status.HTTP_400_BAD_REQUEST)

        data = request.data.dict()
        data['passenger'] = request.user.passenger.id
        serializer = self.get_serializer(data=data)

        if serializer.is_valid(raise_exception=False):
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

class RatingDetail(generics.RetrieveDestroyAPIView):
    serializer_class = RatingSerializer

    def get_queryset(self):
        return Rating.objects.all()

# Helper methods
def register(data):
    serializer = UserRegisterSerializer(data=data)

    if serializer.is_valid(raise_exception=True):
        return serializer
    else:
        return None
