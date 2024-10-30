from django.contrib import admin

from .models import Products, Category, Discount

# Register your models here.
@admin.register(Products)
class AdminProducts(admin.ModelAdmin):
    pass

@admin.register(Category)
class AdminCategory(admin.ModelAdmin):
    pass

@admin.register(Discount)
class AdminDiscount(admin.ModelAdmin):
    pass