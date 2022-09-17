# Generated by Django 4.0.3 on 2022-09-16 04:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_alter_appointment_vin'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appointment',
            old_name='customer_name',
            new_name='owner',
        ),
        migrations.RenameField(
            model_name='appointment',
            old_name='vin',
            new_name='vehicle',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='date_time',
        ),
        migrations.RemoveField(
            model_name='autovo',
            name='import_href',
        ),
        migrations.AddField(
            model_name='appointment',
            name='canceled',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='appointment',
            name='date',
            field=models.DateField(default='false'),
        ),
        migrations.AddField(
            model_name='appointment',
            name='finished',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='appointment',
            name='time',
            field=models.TimeField(default='false'),
        ),
        migrations.AddField(
            model_name='autovo',
            name='color',
            field=models.CharField(default='---', max_length=50),
        ),
        migrations.AddField(
            model_name='autovo',
            name='year',
            field=models.SmallIntegerField(default='---'),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='technician',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='appointment', to='service_rest.technician'),
        ),
        migrations.AlterField(
            model_name='autovo',
            name='vin',
            field=models.CharField(max_length=25, unique=True),
        ),
    ]