from django.urls import path, include
from . import views
from rest_framework import routers

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'', views.QuestionViewSet)
router.register(r'prop', views.PropositionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    #path('', views.api, name="api")
]

