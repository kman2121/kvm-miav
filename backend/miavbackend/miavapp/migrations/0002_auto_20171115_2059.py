# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-11-16 01:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('miavapp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='photo',
        ),
        migrations.AddField(
            model_name='driver',
            name='photo',
            field=models.ImageField(blank=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(default='', max_length=16, unique=True),
            preserve_default=False,
        ),
    ]
