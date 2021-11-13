# Generated by Django 3.2.8 on 2021-10-26 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0003_auto_20210215_1509'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='member',
            options={'ordering': ['id']},
        ),
        migrations.AlterField(
            model_name='member',
            name='external_id',
            field=models.CharField(help_text='ID from third party system', max_length=64),
        ),
    ]