# -*- coding: utf-8 -*-
# Generated manually
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('miavapp', '0006_auto_20171202_1921'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_active',
        ),
    ]
