from rest_framework import serializers

from .models import Products, Discount, UsersRate, UserReview, ReviewRate
from api_users.models import Users

# REVIEWS #

class UserReviewCreate(serializers.ModelSerializer):

    class Meta:
        model=UserReview
        fields=('id', 'user_id', 'value', 'date_publish')

class UserInfoForReviews(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ('id', 'avatar', 'last_name', 'first_name')

class UserReviewSerializer(serializers.ModelSerializer):

    user_id = UserInfoForReviews()
    
    class Meta:
        model = UserReview
        fields = ('id', 'value', 'user_id', 'date_publish')
        ordering = ('date_publish',)

class ReviewRateSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        return ReviewRate.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.assessment = validated_data.get('assessment', instance.assessment)
        instance.product = validated_data.get('product', instance.product)
        instance.review = validated_data.get('review', instance.review)
        instance.user = validated_data.get('user', instance.user)
        instance.save()
        return instance

    class Meta:
        model = ReviewRate
        fields = ('assessment', 'review', 'user', 'product')

# PRODUCT #

class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = ['id', 'value']

class ProductsSerializer(serializers.ModelSerializer):
    discount = DiscountSerializer()

    class Meta: 
        model = Products
        fields = ('name', 'description', 'price', 'articul', 'img_url', 'discount')

class RefactoredExactProductReviews(serializers.ModelSerializer):
    user_id = UserInfoForReviews()

    class Meta:
        model = UserReview
        fields = ('id', 'value', 'user_id', 'date_publish')
        ordering = ('date_publish',)

# USERS #

class UsersRateSerializer(serializers.ModelSerializer):
    
    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.user_rate = validated_data.get('user_rate', instance.user_rate)
        instance.save()
        return instance

    class Meta:
        model = UsersRate
        fields = ('user_rate', 'user')

class RefactoredExactProduct(serializers.ModelSerializer):

    discount = DiscountSerializer()
    rate = UsersRateSerializer(many=True)
    
    class Meta:
        model = Products
        fields = ('id', 
                  'name', 
                  'description', 
                  'price', 
                  'articul', 
                  'img_url', 
                  'discount',
                  'amount',
                  'rate'
                  )

class UsersAuthorizationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ('email', 'password')