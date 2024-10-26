from django.db import models

# Create your models here.
class Products(models.Model):
    name = models.CharField(max_length=50, null=False)
    description = models.CharField(null=False)
    price = models.DecimalField(decimal_places=2, max_digits=9)
    amount = models.IntegerField(default=0)
    slug = models.SlugField()
