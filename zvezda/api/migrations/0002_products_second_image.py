# Generated by Django 5.1.3 on 2024-12-18 22:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='products',
            name='second_image',
            field=models.FileField(blank=True, null=True, upload_to='products/'),
        ),
    ]