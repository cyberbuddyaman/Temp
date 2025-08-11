/*$("#image").click(function() {
	if($("#form-signup").prop("hidden") == false){
		//document.getElementById('imgInp').click();
	}
});*/
$("#open-signup-form").click(function(){
	//$("#form-header-img").attr("src","icons/signup.png");
	$("#form-signup").prop('hidden','');
	$("#form-login").prop('hidden',true);
	$("#form-forgetPass").prop('hidden',true);
});
$("#open-login-form").click(function(){
	$("#image").attr("src", "assets/img/avatar.png");
	//$("#form-header-img").attr("src","icons/login.png");
	$("#form-signup").prop('hidden',true);
	$("#form-login").prop('hidden','');
	$("#form-forgetPass").prop('hidden',true);
});

$("#open-forgotPass-form").click(function(){
	$("#image").prop('hidden',true);
	$("#form-forgetPass").prop('hidden','');
	$("#form-signup").prop('hidden',true);
	$("#form-login").prop('hidden',true);
});

/*
function setImage(input) {
if (input.files && input.files[0]) {
var reader = new FileReader();
reader.onload = function(e) {
document.getElementById("image").src =e.target.result;
}
reader.readAsDataURL(input.files[0]);
}
}*/