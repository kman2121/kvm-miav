from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

from miavapp import validators

class UserManager(BaseUserManager):
    def create_user(self, password=None, **kwargs):
        user = self.model(username=kwargs.get('username'),
                          phone=kwargs.get('phone'))

        user.set_password(password)
        user.save()
        return user

class User(AbstractBaseUser):
    username = models.CharField(max_length=16, unique=True)
    date_created = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True)
    phone = models.BigIntegerField(unique=True)

    objects = UserManager()
    USERNAME_FIELD = 'username'

    @property
    def usertype(self, *args, **kwargs):
        if hasattr(self, 'driver'):
            return 'driver'
        elif hasattr(self, 'passenger'):
            return 'passenger'
        else:
            return None

    class Meta:
        db_table = 'user'

class Vehicle(models.Model):
    year = models.IntegerField()
    make = models.CharField(max_length=20)
    model = models.CharField(max_length=20)
    license = models.CharField(max_length=7)

    class Meta:
        db_table = 'vehicle'

class Passenger(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'passenger'

class Driver(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    vehicle = models.OneToOneField(Vehicle, on_delete=models.CASCADE)
    photo = models.ImageField(blank=True, null=True)

    location_lat = models.FloatField(blank=True, null=True)
    location_long = models.FloatField(blank=True, null=True)

    @property
    def location(self, *args, **kwargs):
        return (self.location_lat, self.location_long)

    class Meta:
        db_table = 'driver'

class Rating(models.Model):
    passenger = models.ForeignKey(Passenger)
    driver = models.ForeignKey(Driver, related_name='ratings')
    rating = models.IntegerField()

    class Meta:
        db_table = 'rating'

class Job(models.Model):
    passenger = models.ForeignKey(Passenger)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(blank=True, null=True)
    max_price = models.DecimalField(max_digits=4, decimal_places=2)
    num_boxes = models.IntegerField()
    description = models.TextField()
    job_type = models.CharField(max_length=4, validators=[validators.validate_job_type])
    status = models.CharField(max_length=10, validators=[validators.validate_status])

    class Meta:
        db_table = 'job'

class Trip(models.Model):
    driver = models.ForeignKey(Driver)
    job = models.ForeignKey(Job)

    start_loc_lat = models.FloatField()
    start_loc_long = models.FloatField()
    end_loc_lat = models.FloatField()
    end_loc_long = models.FloatField()

    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    @property
    def start_loc(self):
        return (self.start_loc_lat, self.start_loc_long)

    @property
    def end_loc(self):
        return (self.end_loc_lat, self.end_loc_long)

    class Meta:
        db_table = 'trip'
