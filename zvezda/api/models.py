from django.db import models, transaction
from django.contrib.auth.models import AbstractUser

# * PRODUCTS

class Category(models.Model):
    name = models.CharField(null=False)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


class Discount(models.Model):
    name = models.CharField(null=False)
    value = models.DecimalField(max_digits=3, decimal_places=2, null=False)
    start_data = models.DateField(null=False)
    end_date = models.DateField()

    def __str__(self):
        return self.name
    
class ProductRate(models.Model):
    product = models.OneToOneField('Products', on_delete=models.CASCADE)
    good_rates = models.IntegerField(default=0)
    bad_rates = models.IntegerField(default=0)

    def __str__(self):
        return f'Rating: {self.good_rates + self.bad_rates}'

class UsersRate(models.Model):
    user = models.ForeignKey('Users', on_delete=models.CASCADE, null=False)
    product = models.ForeignKey('Products', on_delete=models.CASCADE)
    user_rate = models.BooleanField(null=True, default=None)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        with transaction.atomic():
            product_rate, created = ProductRate.objects.get_or_create(product=self.product.id)

            if self.user_rate == True:
                product_rate.good_rates = UsersRate.objects.filter(product=self.product, user_rate=True).count()
                product_rate.bad_rates = UsersRate.objects.filter(product=self.product, user_rate=False).count()
            else:
                product_rate.good_rates = UsersRate.objects.filter(product=self.product, user_rate=True).count()
                product_rate.bad_rates = UsersRate.objects.filter(product=self.product, user_rate=False).count()

            product_rate.save()

    def __str__(self):
        return f'User: {self.user} | Product: {self.product}'

class UserReview(models.Model):
    user_id = models.ForeignKey('Users', on_delete=models.CASCADE)
    value = models.CharField(max_length=2000, blank=False)
    date_publish = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user_id.email

class Products(models.Model):
    name = models.CharField(max_length=50, null=False)
    description = models.CharField(max_length=255, null=False)
    price = models.DecimalField(decimal_places=2, max_digits=9)
    articul = models.BigIntegerField(unique=True)
    amount = models.IntegerField(default=0)
    date_add = models.DateField(auto_now_add=True)
    img_url = models.CharField(max_length=255, null=False, default='https://cdn-icons-png.flaticon.com/512/2175/2175188.png')
    second_image = models.FileField(upload_to='media/', blank=True, null=True)
    rate = models.OneToOneField('ProductRate', on_delete=models.SET_NULL, null=True, blank=True)
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, blank=True)
    discount = models.ForeignKey('Discount', on_delete=models.SET_NULL, null=True, blank=True)
    reviews = models.ManyToManyField(UserReview)

    def save(self, *args, **kwargs):
        is_new = self.pk is None 

        super().save(*args, **kwargs)

        if is_new:
            with transaction.atomic():
                product_rate = ProductRate.objects.create(product=self)
                self.rate = product_rate
                super().save(update_fields=["rate"])

    def __str__(self):
        return self.name

# * USERS

class Users(AbstractUser):
    email = models.CharField(null=False, unique=True)
    avatar = models.CharField(default='https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg')
    username = models.CharField(unique=False, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


    def __str__(self):
        return self.email