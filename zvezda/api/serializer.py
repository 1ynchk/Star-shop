from rest_framework import serializers

from .models import Products, Discount, ProductRate, Users, UsersRate, UserReview, ReviewRate

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

class ProductRate(serializers.ModelSerializer):
    class Meta:
        model = ProductRate
        fields = '__all__'

class RefactoredExactProduct(serializers.ModelSerializer):

    discount = DiscountSerializer()
    rate = ProductRate()

    class Meta:
        model = Products
        fields = ('id', 
                  'name', 
                  'description', 
                  'price', 
                  'articul', 
                  'img_url', 
                  'discount', 
                  'rate', 
                  'amount', 
                  )
        
class RefactoredExactProductReviews(serializers.ModelSerializer):
    user_id = UserInfoForReviews()

    class Meta:
        model = UserReview
        fields = ('id', 'value', 'user_id', 'date_publish')
        ordering = ('date_publish',)

# USERS #

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

class UsersAuthorizationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ('email', 'password')