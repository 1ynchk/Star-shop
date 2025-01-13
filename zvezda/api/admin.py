from django.contrib import admin
from django.utils.html import format_html

from .models import Products, Category,  UsersRate, UserReview, Books, Chancellery, BooksAuthors


# Register your models here.


@admin.register(Chancellery)
class AdminChancellery(admin.ModelAdmin):
    pass

@admin.register(Products)
class AdminProducts(admin.ModelAdmin):
    list_display = ['show_image', 'name', 'colored_amount', ]
    list_display_links = ['show_image', 'name']
    list_select_related = True
    list_per_page = 10
    exclude = ['rate', 'reviews']
    search_fields = ['name']
    view_on_site = True

    def view_on_site(self, obj):
        return f'http://127.0.0.1:8000/products/{obj.articul}/'

    @admin.display(description='Кол-во')
    def colored_amount(self, obj):
        if obj.amount == 0 :
            color = 'FF0000'
        else:
            color = '008000'
        return format_html("<span style='color: #{};'>{}</span>", color, obj.amount)
    
    @admin.display(description='Фотография')
    def show_image(self, obj):
        return format_html(
            "<img style='width: 25px; background-color: #ffffff; padding: 3px;' src={} />", 
            obj.img_url
            )
@admin.register(BooksAuthors)
class AdminAuthors(AdminProducts):
    pass

@admin.register(Books)
class AdminBooks(AdminProducts):
    pass 

admin.site.register(UserReview)

@admin.register(Category)
class AdminCategory(admin.ModelAdmin):
    pass

admin.site.register(UsersRate)
