# Generated by Django 4.0.3 on 2022-09-16 01:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AutoVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color', models.CharField(default='---', max_length=50)),
                ('year', models.SmallIntegerField()),
                ('vin', models.CharField(max_length=25, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Technician',
            fields=[
                ('name', models.CharField(max_length=200)),
                ('employee_id', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vip', models.BooleanField(default=False)),
                ('owner', models.CharField(max_length=200)),
                ('date', models.DateField(auto_now=True, null=True)),
                ('time', models.TimeField(auto_now=True, null=True)),
                ('reason', models.TextField()),
                ('finished', models.BooleanField(default=False)),
                ('canceled', models.BooleanField(default=False)),
                ('technician', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='appointment', to='service_rest.technician')),
                ('vehicle', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='service', to='service_rest.autovo')),
            ],
        ),
    ]
