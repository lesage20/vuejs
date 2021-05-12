from django.shortcuts import render
from django.http import JsonResponse
from .models import Question, Proposition
from django.core import serializers
# Create your views here.

def api(request):
    questions = Question.objects.all()
    data = {
        'questions': serializers.serialize('json',questions),
    }
    return JsonResponse(data)

from rest_framework import  serializers, viewsets

class PropositionRelatedField(serializers.RelatedField):
    def to_representation(self, obj):
        return {
            'prop': obj.prop,
                    }

# Serializers define the API representation.
class PropositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"


class QuestionSerializer(serializers.ModelSerializer):
    prop = PropositionRelatedField(read_only=True, many=True)
    class Meta:
        model = Question
        fields = "__all__"

    


# ViewSets define the view behavior.
class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class PropositionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer



