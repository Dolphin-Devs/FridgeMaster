# Generated by Django 5.0.7 on 2024-08-02 21:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0002_category_fridge_fridgeitem_item_questions_user_and_more'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='category',
            table='category',
        ),
        migrations.AlterModelTable(
            name='fridge',
            table='fridge',
        ),
        migrations.AlterModelTable(
            name='fridgeitem',
            table='fridge_item',
        ),
        migrations.AlterModelTable(
            name='item',
            table='item',
        ),
        migrations.AlterModelTable(
            name='questions',
            table='questions',
        ),
        migrations.AlterModelTable(
            name='user',
            table='user',
        ),
        migrations.AlterModelTable(
            name='useritem',
            table='useritem',
        ),
    ]
