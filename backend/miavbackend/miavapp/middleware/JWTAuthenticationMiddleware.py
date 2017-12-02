from django.utils.functional import SimpleLazyObject
from django.contrib.auth.middleware import get_user
from django.contrib.auth.models import AnonymousUser
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

class JWTAuthenticationMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.user = SimpleLazyObject(lambda: self.__class__.get_user_jwt(request))
        return self.get_response(request)

    @staticmethod
    def get_user_jwt(request):
        """
        Replacement for django session auth get_user & auth.get_user
         JSON Web Token authentication. Inspects the token for the user_id,
         attempts to get that user from the DB & assigns the user on the
         request object. Otherwise it defaults to AnonymousUser.

        Returns: instance of user object or AnonymousUser object
        """
        user = get_user(request)
        if user.is_authenticated():
            return user

        jwt_authentication = JSONWebTokenAuthentication()
        if jwt_authentication.get_jwt_value(request):
            try:
                (user, jwt_value) = jwt_authentication.authenticate(request)
            except Exception:
                pass

        return user or AnonymousUser()
