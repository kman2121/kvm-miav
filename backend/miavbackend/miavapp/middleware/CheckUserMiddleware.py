"""
Middleware to check that user is authenticated before authorizing any requests
"""
import re

from django.http import HttpResponse
from rest_framework import status

class CheckUserMiddleware(object):
    """
    Middleware to check if User is authenticated
    """
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        pattern = re.compile('/v\\d/auth/[^/]+$')
        current_path = request.META.get('PATH_INFO', '')
        is_registering = current_path in ['/api/v1/drivers', '/api/v1/passengers'] and request.META.get('REQUEST_METHOD') == 'POST'
        if not pattern.match(current_path) and not request.user.is_authenticated() and not is_registering:
            return HttpResponse('Unauthorized', status=status.HTTP_401_UNAUTHORIZED)

        response = self.get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response
