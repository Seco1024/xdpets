# Generated by Django 5.0.4 on 2024-05-19 17:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pet', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pet',
            old_name='ownerId',
            new_name='owner_id',
        ),
        migrations.RenameField(
            model_name='pet',
            old_name='petId',
            new_name='pet_id',
        ),
        migrations.RenameField(
            model_name='pet',
            old_name='name',
            new_name='pet_name',
        ),
    ]
