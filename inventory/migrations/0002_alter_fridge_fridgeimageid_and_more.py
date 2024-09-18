# Generated by Django 5.0.7 on 2024-09-18 14:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fridge',
            name='FridgeImageID',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='inventory.fridge_image'),
        ),
        migrations.AlterField(
            model_name='user_item',
            name='CategoryImageID',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='inventory.category_image'),
        ),
    ]
