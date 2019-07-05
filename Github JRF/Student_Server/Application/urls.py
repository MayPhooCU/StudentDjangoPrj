from Application.models import Student, Course
from Application.views import StudentViewSet, CourseViewSet

from rest_framework.routers import DefaultRouter
from django.conf.urls import include, url

router = DefaultRouter()
router.register(r'Student', StudentViewSet)
router.register(r'Course', CourseViewSet)
urlpatterns = [url (r'^', include(router.urls)),]