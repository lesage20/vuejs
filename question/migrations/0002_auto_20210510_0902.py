# Generated by Django 3.1.7 on 2021-05-10 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Proposition',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prop', models.CharField(max_length=250)),
            ],
            options={
                'verbose_name': 'Proposition',
                'verbose_name_plural': 'Propositions',
            },
        ),
        migrations.AddField(
            model_name='question',
            name='prop',
            field=models.ManyToManyField(null=True, to='question.Proposition'),
        ),
    ]
