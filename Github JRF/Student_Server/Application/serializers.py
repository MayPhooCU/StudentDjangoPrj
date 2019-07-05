from Application.models import Student,Course
from rest_framework import serializers

class StudentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Student
		fields = ('id', 'studentName', 'dateOfBirth', 'emailAddress', 'mobileNumber', 'gender', 'address', 'courseId', )

class CourseSerializer(serializers.ModelSerializer):
	studentId = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	class Meta:
		model = Course
		fields = ('id', 'courseName', 'major','studentId' )