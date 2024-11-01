from rest_framework import serializers

from .models import Products, Discount

class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = ['id', 'value']

class ProductsSerializer(serializers.ModelSerializer):
    discount = DiscountSerializer()

    class Meta: 
        model = Products
        fields = ('name', 'description', 'price', 'articul', 'img_url', 'discount')

class ExactProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Products
        fields = ('name', 'description', 'price', 'articul', 'img_url', 'discount')