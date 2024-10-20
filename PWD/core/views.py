import datetime
import random
import string
from rest_framework.permissions import IsAdminUser
from django.core.mail import send_mail
from rest_framework import exceptions
from rest_framework.response import Response
from rest_framework.views import APIView

from .authentications import create_access_token, JWTAuthentication, create_refresh_token, decode_refresh_token
from .models import User, UserToken, Reset
from .serialisers import UserSerializer
from rest_framework import status


class RegisterAPIView(APIView):
    def post(self, request):
        data = request.data

        if data['password'] != data['password_confirm']:
            raise exceptions.APIException('Passwords do not match!')

        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginAPIView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise exceptions.AuthenticationFailed('Invalid credentials')

        if not user.check_password(password):
            raise exceptions.AuthenticationFailed('Invalid credentials')
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        response = Response()
        response.set_cookie(key='refresh_token', value=refresh_token, httponly=True)
        response.data = {
            'token': access_token
        }
        return response
    
class UserAPIView(APIView):
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        return Response(UserSerializer(request.user).data)


# all user in data base
class AllUsersAPIView(APIView):

    def get(self, request):
        # Retrieve all users from the database
        users = User.objects.all()

        # Serialize the users data
        serializer = UserSerializer(users, many=True)

        # Return the serialized users data in the response
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
# User deletetion 
class UserDeleteAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    def delete(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class RefreshAPIView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        id = decode_refresh_token(refresh_token)

      
        access_token = create_access_token(id)
        return Response({
            'token': access_token
        })


class LogoutAPIView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        UserToken.objects.filter(token=refresh_token).delete()
        response = Response()
        response.delete_cookie(key='refresh_token')
        response.data = {
            'message': 'success'
        }
  
        return response


class ForgotAPIView(APIView):
    def post(self, request):
        email = request.data['email']
        token = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(10))

        Reset.objects.create(
            email=email,
            token=token
        )

        url = 'https://portal.darululuum.com/reset/' + token

        send_mail(
            subject='Reset your password!',
            message='Click <a href="%s">here</a> to reset your password!' % url,
            from_email='from@example.com',
            recipient_list=[email]
        )

        return Response({
            'message': 'success'
        })


class ResetAPIView(APIView):
    def post(self, request):
        data = request.data

        if data['password'] != data['password_confirm']:
            raise exceptions.APIException('Passwords do not match!')

        reset_password = Reset.objects.filter(token=data['token']).first()

        if not reset_password:
            raise exceptions.APIException('Invalid link!')

        user = User.objects.filter(email=reset_password.email).first()

        if not user:
            raise exceptions.APIException('User not found!')

        user.set_password(data['password'])
        user.save()

        return Response({
            'message': 'success'
        })
