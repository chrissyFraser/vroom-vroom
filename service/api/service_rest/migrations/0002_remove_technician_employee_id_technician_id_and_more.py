# Generated by Django 4.0.3 on 2022-09-18 21:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='technician',
            name='employee_id',
        ),
        migrations.AddField(
            model_name='technician',
            name='id',
            field=models.IntegerField(default=1, primary_key=True, serialize=False),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='autovo',
            name='color',
            field=models.CharField(max_length=50),
        ),
    ]