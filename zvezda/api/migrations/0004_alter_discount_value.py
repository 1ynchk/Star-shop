# Generated by Django 5.1.2 on 2024-10-29 11:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_discount_products_articul_alter_products_category_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='discount',
            name='value',
            field=models.DecimalField(decimal_places=2, max_digits=3),
        ),
    ]
