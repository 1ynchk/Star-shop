from django.db import connection

from .models import UsersRate

def get_raw_product_rate(product_id, user_id):
    return UsersRate.objects.raw(
            '''
        select
            au.id,
            au.user_rate,
            au.user_id
        from api_users_rate au 
            join api_products_rate apr on apr.usersrate_id = au.id 
        where apr.products_id = %s and au.user_id = %s
        '''
        , [product_id, user_id])[0]

def add_raw_product_rate_mtm(product_id, users_rate):
    with connection.cursor() as cursor:
            cursor.execute(
                '''
                INSERT INTO api_products_rate (products_id, usersrate_id) 
                VALUES (%s, %s)
                ''', [product_id, users_rate]
            )