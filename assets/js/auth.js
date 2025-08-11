$("#login-signup-button").click(function() {
	let v = $(this).val();
	if (v === 'Login') {
		$("#image").prop('hidden',false);
		$("#form-login").removeAttr('hidden');
		$("#form-signup").attr('hidden','');
		$("#form-forgetPass").attr('hidden','');
		$("#modalLoginSignUp").modal('show');
	}
	
});


function signUpWithEmailPasswoerd(e) {
	var username = $("#signup-username").val();
	var useremail = $("#signup-email").val();
	var usermobile = $("#signup-mobile").val();
	var userpass = $("#signup-password").val();
	var usercpass = $("#signup-cpassword").val();
	$(e).attr("disabled",true);
	
	
	
	var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = dd + '-' + mm + '-' + yyyy;
    
    if(usercpass == userpass && usercpass.length >= 6 && username.length >= 2 && usermobile.length >= 10){
		firebase.auth().createUserWithEmailAndPassword(useremail, userpass)
		.then((user) => {
			var uid = firebase.auth().currentUser.uid;
			$.ajax({
				 url: 'auth-session.php',
				 method: 'POST',
				 data: 'email=' + useremail + '&password=' + userpass + "&name=" + userpass + "&uid=" + uid,
				 success: function() {
					var database = firebase.database();
					database.ref().child("users").child(uid).set({
						email: useremail,
						name: username,
						profile: 'https://firebasestorage.googleapis.com/v0/b/indian-abacus-academy.appspot.com/o/default%2Fstudent.png?alt=media&token=ac0f0ea8-0351-4852-a90d-526d2bbf58d5',
						mobile: usermobile,
						regdate: today,
						registered: 'NO'
					});
					setName(username);
					$("#modalLoginSignUp").modal('hide');
					$("#login-signup-button").val(username);
				 }  
			  });
		})
		.catch((error) => {
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  $(e).attr("disabled",false);
		  alert(errorMessage);
		});
	}else{
		alert("!something went wrong...");
	}
}

function logout() {
	let conf = confirm("Are you sure you wanna signout?");
		if (conf == true) {
			$.ajax({
				 url: 'auth-session.php',
				 method: 'POST',
				 data: 'logout=logout',
				 success: function() {
					 window.location="index.php";
				 }
		});
		}
}

function setName(name) {
	$("#login-signup-button").css("display","none");
	if ($(window).width() < 700) {
		$("#login-signup-button").after('<button onclick="logout()" class="btn btn-outline-danger">' + getShortName(name) + '</button>');
	}else {
		$("#login-signup-button").after('<button onclick="logout()" class="btn btn-outline-danger">' + getFirstName(name) + '</button>');
	}
}
function getFirstName(name){
	var x = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' 
	if(name.split(" ")[0].length<10)
	return x + name.split(" ")[0] + x;
	else return name.split(" ")[0];
}
function getShortName(name){
	var x = "";
	name.split(" ").forEach(function(nm) {
		x = x + nm[0];
	});
	return x;
}
function loginUsingEmailPassword(e) {
	var email = $("#login-email").val();
	var pass = $("#login-password").val();
	$(e).attr("disabled",true);
	firebase.auth().signInWithEmailAndPassword(email, pass)
    .then((user) => {
	  var uid = firebase.auth().currentUser.uid;
	  var database = firebase.database();
			database.ref().child("users").child(uid).on('value',(snapshot) => {
				  let name = snapshot.child("name").val();
				  setName(name);
				  $("#modalLoginSignUp").modal('hide');
				  $("#login-signup-button").val(name);
				  $.ajax({
				 url: 'auth-session.php',
				 method: 'POST',
				 data: 'email=' + email + '&password=' + pass + "&name=" + name + "&uid=" + uid,
				 success: function() {
					
				 }  
			  });
		});
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
	  alert(errorMessage);
	  $(e).attr("disabled",false);
    });
}

function authenticate(email,pass,name) {
	setName(name);
	$("#login-signup-button").val(name);
	firebase.auth().signInWithEmailAndPassword(email, pass)
    .then((user) => {
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
	  alert(errorMessage);
    });
}

function sendForgetLink() {
	var email = $("#forget-password-email").val();
	if (email.length > 0) {
		firebase.auth().sendPasswordResetEmail(email).then(()=>{
			alert("Email Sent");
		})
		.catch((error) => {
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  alert(errorMessage);
		});
	}else {
		alert("Something Went Wrong");
	}
	$("#modalLoginSignUp").modal('hide');
}