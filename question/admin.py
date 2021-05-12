from django.contrib import admin
from .models import Question, Proposition
# Register your models here.

admin.site.register(Proposition)
admin.site.register(Question)