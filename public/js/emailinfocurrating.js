$("header").sticky({zIndex:1000});
var winH = window.innerHeight;
$(".usertypes").hide();
/********************
 pop-up dialog close button handling & css
********************/
$("#close").click(function(){
	//$("#welcomedialog").hide();
  $('html,body').animate({
    scrollTop: $(".maincontent").offset().top -240
  }, 1000);
});


/*******************
 user type selection
*******************/
var defaultgetemailcontent = $("body section #getemail").html();
$(".userselection").select2({
	placeholder:"click to select"
});
/*******************
 image click homepage redirect
*******************/

$("header img").on("click",function(){
		$("body .cd-horizontal-timeline").hide();
		$(".maincontent").css("height","auto");
		$("body section #getemail").html(defaultgetemailcontent);
		$(".userselection").select2({
			placeholder:"click to select"
		});
		userSelection();
		$("#selectioncontent").show();
    });
/*******************
 footer color transitions
*******************/

$("footer a").on("mouseenter",function(){
    $(this).css("color","#f80c00");
	$(this).css("cursor","pointer");
}).on("mouseleave",function(){
     $(this).css("color","white");

});

$("footer a").on("click",function(){
	var clickedvalue = $(this).html();
	if(clickedvalue == " DEVELOPMENT PROGRESS ")
	{
		$("body .maincontent #selectioncontent").hide();
		$(".maincontent").css("height","53.5vh");
		$("body .maincontent #getemail").html("<h1 style='color:#ffed01'>DEVELOPMENT PROGRESS</h1>");
		$("body .maincontent #getemail").append("<img src='images/development_icon.png' alt='Development Progress Icon'>");
		$("body .cd-horizontal-timeline").show();
		//$("body .cd-horizontal-timeline").html("<p style='width:100%;text-align:center'> development progress will be updated soon....</p>");
	}

	else if (clickedvalue == " ABOUT MuMoAfruika")
	{
		$("body .maincontent #selectioncontent").hide();
		$(".maincontent").css("height","auto");
		$("body .cd-horizontal-timeline").hide();
		$("body .maincontent #getemail").html("<h1 style='color:#ffed01'>ABOUT US</h1><p>Imagine a music platform that has, at its core, music fans, music producers, and music artists as the main purpose of the platform. This is what's at the heart of MumoAfruika; a platform that is built to interplay on these main three categories of users. With tools that help each of the user types, enjoy streaming, sharing content for their users, and scouting for new talent. MumoAfruika is going to add a flare to the AfroBeat streaming scene.</p>");
	}
});

var unsubscribe = $("#unsubscribe").text();
if(unsubscribe.includes("We are"))
{
  	$("#welcomedialog").show();
  	$("#welcomedialog #head h1").text("EMAIL SUBSCRIPTION REMOVAL!");
  	$("#welcomedialog #head").css("background-color","#00b83c");
  	$("#welcomedialog #head").css("color","white");
  	$("#welcomedialog #section p").text(unsubscribe);
}

$('#userselection div').click(function(){
    selection = $(this).text();
    title = $(".usertypes .col-sm-4 h1").text();
    $(".usertypes").show();
    $('html,body').animate({
      scrollTop: $(".usertypes").offset().top - 240
    }, 1000)
		if(selection == "ARTISTS & CONTENT CREATORS" && selection != title){
			$(".usertypes .col-sm-4").html("<h1>"+selection+"</h1>")
			$(".usertypes #getemail").html("<p> You will have a lot of features at your disposal. Development is currently underway and as we have"+
										"complete set milestones that are linked to these features, we will send you emails. Furthermore, you will get access to"+
										" upload your content when our beta pilot version of the platform is ready.<br/> Enter your email and click subscribe"+
								" to stay upto date with MuMoAfruika. </p> <input type='text' id='emailin' placeholder='ENTER EMAIL ADDRESS' value=''/> <br/> <button id='subscribe'> SUBSCRIBE<img id='loader' src='images/ajax-loader.gif'></button");
			$("#loader").hide();
			subscribeHandling();
		}
		else if (selection == "PRODUCERS, STUDIOS & COMPANIES" && selection != title){
      $(".usertypes .col-sm-4").html("<h1>"+selection+"</h1>")
			$(".usertypes #getemail").html("<p> You will have access to raw and emerging talent, but it doesn't end there. The tools that we "+
										" are coining will further take the Afrobeat scene up a notch!"+
										"<br/> Stay connected with our development progress and be the first to have access to our beta pilot test run of the system by subscribing to our email list."+
								" </p> <input type='text' id='emailin' placeholder='ENTER EMAIL ADDRESS' value=''/> <br/> <button id='subscribe'> SUBSCRIBE <img id='loader' src='images/ajax-loader.gif'></button");
			$("#loader").hide();
			subscribeHandling();
		}
		else if (selection == "CONTENT FANS" && selection != title){
      $(".usertypes .col-sm-4").html("<h1>"+selection+"</h1>")
			$(".usertypes #getemail").html("<p> You will stay connected with the latest work from your favorite artists. We even have something"+
																   " install for you to stay intouch with every concert they do! <br/>So go ahead and subscribe to our email list"+
																   " and we will keep you updated with our development. <br/>"+
																   "</p> <input type='text' id='emailin' placeholder='ENTER EMAIL ADDRESS' value=''/> <br/> <button id='subscribe'> SUBSCRIBE <img id='loader' src='images/ajax-loader.gif'> </button");
			$("#loader").hide();

			subscribeHandling();

		}
});

function subscribeHandling(){
	$("#subscribe").click(function(){
		  var email = $("#emailin").val();
		  var format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		  if(format.test(email) == true)
		  {
            var data = {};

		  	//get user type
            data.email = email;
            data.usertype = $(".userselection").val();
            $("#loader").show();
		  	//sending request to server with relevant info
          	$.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType : 'application/json',
                url:'/subscribeemail',
                success: function(data)
                {
                	$("#loader").hide();
          		  	$("#statusdialog").show();
          		  	$("statusdialog").css("margin-top","-258px");
				  	$("#statusdialog #head h1").text("EMAIL SUBSCRIPTION STATUS");
				  	$("#statusdialog #head").css("background-color","#00b83c");
				  	$("#statusdialog #head").css("color","white");
				  	$("#statusdialog #section p").text(data);
				  	$("#statusdialog").text("CLOSE");

            	}
      		});
		  	}
		  else
		  {
		  	$("#statusdialog").show();
		  	$("#statusdialog #head h1").text("EMAIL SUBSCRIPTION ERROR!");
		  	$("#statusdialog #head").css("background-color","#f80c00");
		  	$("#statusdialog #head").css("color","white");
		  	$("#statusdialog #section p").text("Please check if you entered a valid email address.");
		  	$("#statusdialogclose").text("CLOSE");
		  }
	});
}
