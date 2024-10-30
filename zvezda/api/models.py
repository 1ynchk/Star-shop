from django.db import models

# Create your models here.
class Products(models.Model):
    name = models.CharField(max_length=50, null=False)
    description = models.CharField(null=False)
    price = models.DecimalField(decimal_places=2, max_digits=9)
    amount = models.IntegerField(default=0)
    articul = models.BigIntegerField(unique=True)
    date_add = models.DateField(auto_now_add=True)
    img_url = models.CharField(null=False)
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, blank=True)
    discount = models.ForeignKey('Discount', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name

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