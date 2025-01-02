from django.contrib import admin
from django.contrib.auth.forms import  UserChangeForm

from .models import Users

# Register your models here.

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = Users
        fields = ('email',)

class CustomUserAdmin(admin.ModelAdmin):
    model = Users
    form = CustomUserChangeForm

admin.site.register(Users, CustomUserAdmin)