# Generated by Django 5.1.3 on 2024-12-21 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_userreview_products_reviews'),
    ]

    operations = [
        migrations.AddField(
            model_name='userreview',
            name='date_publish',
            field=models.DateField(auto_now_add=True, default='2024-12-12'),
            preserve_default=False,
        ),
    ]