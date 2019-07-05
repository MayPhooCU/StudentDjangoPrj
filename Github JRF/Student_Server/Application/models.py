from django.db import models

class Student(models.Model):
	studentName = models.CharField(max_length=100, default="")
	dateOfBirth = models.CharField(max_length=100, default="")
	emailAddress = models.CharField(max_length=100, default="")
	mobileNumber = models.CharField(max_length=100, default="")
	gender = models.CharField(max_length=100, default="")
	address = models.CharField(max_length=100, default="")
	courseId = models.ForeignKey('Course', related_name='studentId', on_delete=models.CASCADE)
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Student, self).save(*args, **kwargs)

class Course(models.Model):
	courseName = models.CharField(max_length=100, default="")
	major = models.CharField(max_length=100, default="")
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Course, self).save(*args, **kwargs)
