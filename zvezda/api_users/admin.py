from django.contrib import admin
from django.contrib.auth.forms import  UserChangeForm

from .models import Users

# Register your models here.

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = Users
        fields = ('email',)

@admin.register(Users)
class CustomUserAdmin(admin.ModelAdmin):
    list_display  = ['email', 'last_name', 'first_name']
    
    form = CustomUserChangeForm
