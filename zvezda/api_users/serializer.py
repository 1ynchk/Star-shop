from rest_framework import serializers

from .models import Users, Cart, Favourite

class GetUsersProfileInfo(serializers.ModelSerializer):
    class Meta: 
        model = Users
        fields = ['last_name', 'first_name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'last_name': {'required': False},
            'first_name': {'required': False},
            'email': {'required': False},
        }

    def update(self, instance, validated_data):
        password = validated_data.get('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
    
class CartSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cart
        fields = ['user', 'product']

