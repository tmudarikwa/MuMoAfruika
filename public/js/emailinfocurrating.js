
$("#subscribe").click(function(){
	  var email = $("#emailin").val();
	  var format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	  if(format.test(email) == true)
	  {
	  	alert("Email address valid");
	  }
	  else 
	  {
	  	alert("Please enter a valid email address");
	  }
});

var defaultgetemailcontent = $("body section #getemail").html();
$("header img").on("click",function(){
		$("body section #getemail").html(defaultgetemailcontent);
    });

$("footer a").on("click",function(){
	var clickedvalue = $(this).html();
	if(clickedvalue == " DEVELOPMENT PROGRESS ")
	{
		$("body section #selectioncontent").hide();
		$("body section #getemail").html("<h1 style='color:#ffed01'>"+clickedvalue+"</h1><p >testing</p>");
	}
	
	else if (clickedvalue == " ABOUT MuMoAfruika")
	{
		$("body section #selectioncontent").hide();
		$("body section #getemail").html("<h1 style='color:#ffed01'>ABOUT US</h1><p>Imagine a music platform that has, at its core, music fans, music producers, and music artists as the main purpose of the platform. This is what's at the heart of MumoAfruika; a platform that is built to interplay on these main three categories of users. With tools that help each of the user types, enjoy streaming, sharing content for their users, and scouting for new talent. MumoAfruika is going to add a flare to the AfroBeat streaming scene.</p>");
	}
});
