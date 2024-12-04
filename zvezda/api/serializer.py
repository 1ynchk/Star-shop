from rest_framework import serializers

from .models import Products, Discount, ProductRate, Users, UsersRate

class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = ['id', 'value']

class ProductsSerializer(serializers.ModelSerializer):
    discount = DiscountSerializer()

    class Meta: 
        model = Products
        fields = ('name', 'description', 'price', 'articul', 'img_url', 'discount')

class ProductRate(serializers.ModelSerializer):
    class Meta:
        model = ProductRate
        fields = '__all__'

class ExactProductSerializer(serializers.ModelSerializer):
    
    discount = DiscountSerializer()
    rate = ProductRate()

    class Meta:
        model = Products
        fields = ('id', 'name', 'description', 'price', 'articul', 'img_url', 'discount', 'rate', 'amount')

class UsersRateSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        return UsersRate.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.product = validated_data.get('product', instance.product)
        instance.user_rate = validated_data.get('user_rate', instance.user_rate)
        instance.save()
        return instance

    class Meta:
        model = UsersRate
        fields = '__all__'

class PostUsersProfileInfo(serializers.ModelSerializer):
    last_name = serializers.CharField()
    first_name = serializers.CharField()
    password = serializers.CharField()
    email = serializers.CharField()

    def update(self, instance, validated_data):
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.password = validated_data.get ('password', instance.password)  
        instance.email = validated_data.get ('email', instance.email)
        instance.save()
        return instance

class GetUsersProfileInfo(serializers.ModelSerializer):

    class Meta: 
        model = Users
        fields = ['last_name', 'first_name', 'email']


class UsersAuthorizationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ('email', 'password')



