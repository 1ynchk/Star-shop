from rest_framework import serializers

from .models import Products

class ProductsSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50)
    description = serializers.CharField()
    price = serializers.DecimalField(decimal_places=2, max_digits=9)
    amount = serializers.IntegerField(default=0)
    slug = serializers.SlugField()
    img_url = serializers.CharField()
