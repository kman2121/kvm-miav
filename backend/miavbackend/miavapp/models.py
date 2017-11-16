from django.db import models

# Create your models here.
# x

class User(models.model):
    username = models.CharField()
    password = models.CharField()
    phone = models.IntegerField()
    photo = models.ImageField()

class Vehicle(models.Model):
    year = models.IntegerField()
    license = models.CharField(max_length=7)
    make = models.CharField()
    model = models.CharField()

class Passenger(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

class Driver(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    #location = models.
    vehicle = models.OneToOneField(Vehicle, on_delete=models.CASCADE)

class Rating(models.Model):
    passenger = models.ForeignKey(Passenger)
    driver = models.ForeignKey(Driver, related_name='ratings')
    rating = models.IntegerField()

class Trip(models.Model):
    driver = models.ForeignKey(Driver)
    job = models.ForeignKey(Job)
    