from django.contrib import admin
from django.contrib.auth.forms import  UserChangeForm

from .models import Products, Category, Discount, Users, UsersRate, UserReview

# Register your models here.
@admin.register(Products)
class AdminProducts(admin.ModelAdmin):
    pass

@admin.register(UserReview)
class AdminUserReview(admin.ModelAdmin):
    pass

@admin.register(Category)
class AdminCategory(admin.ModelAdmin):
    pass

@admin.register(Discount)
class AdminDiscount(admin.ModelAdmin):
    pass

@admin.register(UsersRate)
class AdminUserRate(admin.ModelAdmin):
    pass

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = Users
        fields = ('email',)

class CustomUserAdmin(admin.ModelAdmin):
    model = Users
    form = CustomUserChangeForm

admin.site.register(Users, CustomUserAdmin)