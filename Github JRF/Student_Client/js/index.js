$(document).ready(function(){
	$('#course').hide();
	$('#student').show();
	RetrieveStudent();
});


/* Show Student*/
function ShowStudent(){
	$('#course').hide();
	$('#student').show();
	RetrieveStudent();
};

/*Show Course*/
function ShowCourse(){
	$('#student').hide();
	$('#course').show();
	RetrieveCourse();
};

/*Student CREATE Function*/
function CreateStudent(){
	var studentName = document.getElementById("rStudentName").value;
	var dateOfBirth = document.getElementById("rDateOfBirth").value;
	var emailAddress = document.getElementById("rEmailAddress").value;
	var mobileNumber = document.getElementById("rMobileNumber").value;
	var gender = document.getElementById("rGender").value;
	var address = document.getElementById("rAddress").value;
	var courseId = document.getElementById("rCourseId").value;
	if(studentName != "" && dateOfBirth != "" && emailAddress != "" && mobileNumber != "" && gender != "" && address != "" && courseId != "")
	{
	var postData = {
		"id": 12,
        "studentName":studentName ,
        "dateOfBirth": dateOfBirth,
        "emailAddress":emailAddress ,
        "mobileNumber":mobileNumber,
        "gender": gender,
        "address": address,
        "courseId": 2
	};

	$.ajax({
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		url: 'http://localhost:8000/Student/',
		data: JSON.stringify(postData),
		dataType: 'json',
		success: function (){
			alert("successfully.create")
			window.location.assign("index.html");
		}
	});
	ClearDataStudentRegisterModal();
	}
	else{
		alert("Please insert data");
	}
};

/*Student RETRIEVE Data Function*/
function RetrieveStudent(){
	$('#studentTableBody').empty();
	$.ajax({
		type: 'GET',
		contentType: 'application/json; charset=utf-8',
		url: 'http://localhost:8000/Student/',
		dataType: 'json',
	}).then(function(data){
		for(var i=0; i<data.length; i++){
			var studentId = data[i].id;
			var studentName = data[i].studentName;
			var dateOfBirth = data[i].dateOfBirth;
			var emailAddress = data[i].emailAddress;
			var mobileNumber = data[i].mobileNumber;
			var gender = data[i].gender;
			var address = data[i].address;
			var courseId = data[i].courseId;

			document.getElementById("studentTableBody").insertRow(-1).innerHTML = '<tr>'+
																					'<td>'+studentId+'</td>'+
																					'<td>'+studentName+'</td>'+
																					'<td>'+dateOfBirth+'</td>'+
																					'<td>'+emailAddress+'</td>'+
																					'<td>'+mobileNumber+'</td>'+
																					'<td>'+gender+'</td>'+
																					'<td>'+address+'</td>'+
																					'<td>'+courseId+'</td>'+
																					'<td><button type= "button" class="btn btn-primary" data-toggle="modal" data-target= "#studentUpdateModal" onclick="InsertDataIntoStudentUpdateModal('+studentId+');">Edit</button></td>'
																					'</tr>';
		};
	});
};

/*Student UPDATE Function*/
function UpdateStudent(){
	var studentId = document.getElementById("uStudentId").value
	var studentName = document.getElementById("uStudentName").value;
	var dateOfBirth = document.getElementById("uDateOfBirth").value;
	var emailAddress = document.getElementById("uEmailAddress").value;
	var mobileNumber = document.getElementById("uMobileNumber").value;
	var gender = document.getElementById("uGender").value;
	var address = document.getElementById("uAddress").value;
	var courseId = document.getElementById("uCourseId").value;
	if(studentName != "" && dateOfBirth != "" && emailAddress != "" && mobileNumber != "" && gender != "" && address != "" && courseId != "")
	{
	var putData = {
		"studentName": studentName,
		"dateOfBirth": dateOfBirth,
		"emailAddress": emailAddress,
		"mobileNumber": mobileNumber,
		"gender": gender,
		"address": address,
		"courseId": courseId,
	};
	$.ajax({
		type: 'PUT',
		contentType: 'application/json; charset=utf-8',
		url: 'http://localhost:8000/Student/'+studentId+'/',
		data: JSON.stringify(putData),
		dataType: 'json',
		success: function(){
				alert("Successfully Update!");
				window.location.assign("index.html");
			}
	});
	ClearDataStudentUpdateModal();
	}
	else{
		alert("Please insert data");
	}
};

/*Student DELETE Function*/
function DeleteStudent(){
		var studentId = document.getElementById("uStudentId").value;
	if(studentId != "")
	{
		$.ajax({
			type: 'DELETE',
			contentType: 'application/json; charset=utf-8',
			url: 'http://localhost:8000/Student/'+studentId+'/',
			// data: JSON.stringify(),
			dataType: 'json',
			success: function(){
				alert("Delete success");
				window.location.assign("index.html");
			}
		});
		ClearDataStudentUpdateModal();
	}
	else 
	{
		alert("Please insert student ID");
	}
};

/*Clean The Student Data In The Form*/
function ClearDataStudentRegisterModal(){
	document.getElementById("rStudentName").value="";
	document.getElementById("rDateOfBirth").value="";
	document.getElementById("rEmailAddress").value="";
	document.getElementById("rMobileNumber").value="";
	document.getElementById("rGender").value="";
	document.getElementById("rAddress").value="";
	document.getElementById("rCourseId").value="";
	$('#studentRegisterModal').modal('hide');
};

/*Insert Data Into Student Update Modal*/
function InsertDataIntoStudentUpdateModal(id){
	$.ajax({
		type: 'GET',
		contentType: 'application/json; charset=utf-8',
		url: 'http://localhost:8000/Student/'+id+'/',
		dataType: 'json',
	}).then(function(data){
		var studentId = data.id;
		var studentName = data.studentName;
		var dateOfBirth = data.dateOfBirth;
		var emailAddress = data.emailAddress;
		var mobileNumber = data.mobileNumber;
		var gender = data.gender;
		var address = data.address;
		var courseId = data.courseId;

		$('#uStudentId').val(studentId);
		$('#uStudentName').val(studentName);
		$('#uDateOfBirth').val(dateOfBirth);
		$('#uEmailAddress').val(emailAddress);
		$('#uMobileNumber').val(mobileNumber);
		$('#uGender').val(gender);
		$('#uAddress').val(address);
		$('#uCourseId').val(courseId);

	});

};

function ClearDataStudentUpdateModal(){
	document.getElementById("uStudentId").value = "";
	document.getElementById("uStudentName").value = "";
	document.getElementById("uDateOfBirth").value="";
	document.getElementById("uEmailAddress").value="";
	document.getElementById("uMobileNumber").value="";
	document.getElementById("uGender").value="";
	document.getElementById("uAddress").value = "";
	document.getElementById("uCourseId").value = "";
	$('#studentUpdateModal').modal('hide');
};


/*Course Function Start Here*/
function CreateCourse(){
	var courseName = document.getElementById("rCourseName").value;
	var major = document.getElementById("rMajor").value;
	if(courseName != "" && major != "")
	{
		var postData = {
			"courseName": courseName,
			"major": major,
		};
		$.ajax({
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			url: 'http://localhost:8000/Course/',
			data: JSON.stringify(postData),
			dataType: 'json',
			success: function(){
				alert("Registeration is success!");
				window.location.assign("index.html");
			}
		});
		ClearCourseRegisterModal();
	}
	else 
	{
		alert("Please insert data.");
	}
};

/*Retrieve course infromation*/
function RetrieveCourse(){
	$('#courseTableBody').empty();
	$.ajax({
		type: 'GET',
		contentType: 'application/json; charset=utf-8',
		url: 'http://localhost:8000/Course/',
		dataType: 'json',
	}).then(function(data){
		for(var i=0; i<data.length; i++)
		{
			var courseId = data[i].id;
			var courseName = data[i].courseName;
			var major = data[i].major;
			document.getElementById('courseTableBody').insertRow(-1).innerHTML = '<tr>'+
																					'<td>'+courseId+'</td>'+
																					'<td>'+courseName+'</td>'+
																					'<td>'+major+'</td>'+
																					'<td><button type="button" class="btn btn-danger btn-md" data-toggle="modal" data-target="#courseUpdateModal" onclick="InsertDataIntoCourseUpdateModal('+courseId+');">Update</button></td>'+
																					'</tr>';
		}
	});
};

/*Update course information*/
function UpdateCourse(){
	var courseId = document.getElementById("uCourseId").value;
	var courseName = document.getElementById("uCourseName").value;
	var major = document.getElementById("uMajor").value;
	if(courseId != "" && courseName != "" && major != "")
	{
		var putData = {
			"courseName": courseName,
			"major": major,
		};
		$.ajax({
			type: 'PUT',
			contentType: 'application/json; charset=utf-8',
			url: 'http://localhost:8000/Course/'+courseId+'/',
			data: JSON.stringify(putData),
			dataType: 'json',
			success: function(){
				alert("Successfully Update!");
				window.location.assign("index.html");
			}
		});
		ClearCourseUpdateModal();
	}
	else 
	{
		alert("Please insert data");
	}
};

/*Delete course information*/
function DeleteCourse(){
	var courseId = document.getElementById("uCourseId").value;
	if(courseId != "")
	{
		$.ajax({
			type: 'DELETE',
			contentType: 'application/json; charset=utf-8',
			url: 'http://localhost:8000/Course/'+courseId+'/',
			dataType: 'json',
			success: function(){
				alert("Delete success");
				window.location.assign("index.html");
			}
		});
		ClearCourseUpdateModal();
	}
	else 
	{
		alert("Please insert student ID");
	}
};

/*Clear data and close course register modal*/
function ClearCourseRegisterModal(){
	document.getElementById("rCourseName").value = "";
	document.getElementById("rMajor").value = "";
	$('#courseRegisterModal').modal('hide');
};

/*Clear data and close course update modal
*/function ClearCourseUpdateModal(){
	document.getElementById("uCourseId").value = "";
	document.getElementById("uCourseName").value = "";
	document.getElementById("uMajor").value = "";
	$('#courseUpdateModal').modal('hide');
};

/*Insert daa into course update modal*/
function InsertDataIntoCourseUpdateModal(id){
	$.ajax({
		type: 'GET',
		contentType: 'application/json; charset=utf-8',
		url: 'http://localhost:8000/Course/'+id+'/',
		dataType: 'json',
	}).then(function(data){
		console.log(data);
		$('#uCourseId').val(data.id);
		$('#uCourseName').val(data.courseName);
		$('#uMajor').val(data.major);
	});
};