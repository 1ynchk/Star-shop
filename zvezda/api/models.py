from django.db import models

# * PRODUCTS

class Category(models.Model):
    name = models.CharField(null=False)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'api_category'

class Discount(models.Model):
    name = models.CharField(null=False)
    value = models.DecimalField(max_digits=3, decimal_places=2, null=False)
    start_data = models.DateField(null=False)
    end_date = models.DateField()

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'api_discount'

class UserReview(models.Model):

    user_id = models.ForeignKey('api_users.Users', on_delete=models.CASCADE)
    value = models.CharField(max_length=2000, blank=False)
    date_publish = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user_id.email
    
    class Meta:
        db_table = 'api_user_review'

class ReviewRate(models.Model):
    review = models.ForeignKey(UserReview, on_delete=models.CASCADE)
    user = models.ForeignKey('api_users.Users', on_delete=models.CASCADE)
    product = models.ForeignKey('Products', on_delete=models.CASCADE) 
    assessment = models.BooleanField(null=True)

    class Meta:
        db_table = 'api_review_rate'

class UsersRate(models.Model):
    user = models.ForeignKey('api_users.Users', on_delete=models.CASCADE, null=False)
    user_rate = models.BooleanField(null=True, default=None)

    def __str__(self):
        return f'User: {self.user}'
    
    class Meta:
        db_table = 'api_users_rate'

class Products(models.Model):
    name = models.CharField(max_length=50, null=False)
    description = models.CharField(max_length=255, null=False)
    price = models.DecimalField(decimal_places=2, max_digits=9)
    articul = models.BigIntegerField(unique=True)
    amount = models.IntegerField(default=0)
    date_add = models.DateField(auto_now_add=True)
    img_url = models.CharField(max_length=255, null=False, default='https://cdn-icons-png.flaticon.com/512/2175/2175188.png')
    second_url = models.ImageField(upload_to='products/')
    rate = models.ManyToManyField(UsersRate, blank=True, null=True)
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, blank=True)
    discount = models.ForeignKey('Discount', on_delete=models.SET_NULL, null=True, blank=True)
    reviews = models.ManyToManyField(UserReview, blank=True)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'api_products'