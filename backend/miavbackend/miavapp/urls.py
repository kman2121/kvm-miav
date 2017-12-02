from django.conf.urls import include, url
from rest_framework_jwt.views import obtain_jwt_token, \
                                     refresh_jwt_token, \
                                     verify_jwt_token

from miavapp import views

userauthpatterns = [
    url(r'^login$', obtain_jwt_token, name='login'),
    url(r'^refresh$', refresh_jwt_token, name='refresh-token'),
    url(r'^verify$', verify_jwt_token, name='verify-token'),
]

urlpatterns = [
    url(r'^$', views.ApiRoot.as_view(), name='api-root'),
    url(r'^auth/', include(userauthpatterns)),

    url(r'^drivers$', views.DriverList.as_view(), name='drivers-list'),
    url(r'^drivers/(?P<pk>[0-9]+)$', views.DriverDetail.as_view(), name='driver-detail'),

    url(r'^passengers$', views.PassengerList.as_view(), name='passengers-list'),
    url(r'^passengers/(?P<pk>[0-9]+)$', views.PassengerDetail.as_view(), name='passenger-detail'),

    url(r'^jobs$', views.JobList.as_view(), name='jobs-list'),
    url(r'^jobs/(?P<pk>[0-9]+)$', views.JobDetail.as_view(), name='job-detail'),

    url(r'^trips$', views.TripList.as_view(), name='trips-list'),
    url(r'^trips/(?P<pk>[0-9]+)$', views.TripDetail.as_view(), name='trip-detail'),

    url(r'^ratings$', views.RatingList.as_view(), name='ratings-list'),
    url(r'^ratings/(?P<pk>[0-9]+)$', views.RatingDetail.as_view(), name='rating-detail'),
]
