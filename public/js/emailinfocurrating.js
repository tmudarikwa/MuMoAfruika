
$("#close").click(function(){
	$("#welcomedialog").hide();
});

var defaultgetemailcontent = $("body section #getemail").html();
$(".userselection").select2({
	placeholder:"click to select"
});

$("header img").on("click",function(){
		$("body .cd-horizontal-timeline").hide();
		$("body section #getemail").html(defaultgetemailcontent);
		$(".userselection").select2({
			placeholder:"click to select"
		});
		userSelection();
		$("#selectioncontent").show();
    });

userSelection();


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
		$("body .maincontent #getemail").html("<h1 style='color:#ffed01'>DEVELOPMENT PROGRESS</h1>");
		$("body .cd-horizontal-timeline").show();
		$("body .cd-horizontal-timeline").html("<p style='width:100%;text-align:center'> development progress will be updated soon....</p>");
	}
	
	else if (clickedvalue == " ABOUT MuMoAfruika")
	{
		$("body .maincontent #selectioncontent").hide();
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
  	$("#welcomedialog section p").text(unsubscribe);
}

//handling development progess clicks
$(".events-wrapper ol").click(function(){
	console.log($(this));
});

function userSelection(){
	$(".userselection").on("select2:select",function(e) {
		var selection = $(this).val();
		$(".maincontent").css("height","auto");
		if(selection.includes("artist"))
		{
			selection = "an "+ "<b>" +selection.toUpperCase();
			$("#selectioncontent").html("<p> As "+selection+"</b>" +" you will have a lot of features at your disposal. Development is currently underway and as we "+
										"complete set milestones that are linked to these features we will send you emails. Furthermore, you will get access to"+
										" upload your content when our beta pilot version of the platform see ready.<br/> Enter your email and click subscribe"+
								" to stay upto date with MuMoAfruika. </p> <input type='text' id='emailin' placeholder='ENTER EMAIL ADDRESS' value=''/> <br/> <button id='subscribe'> SUBSCRIBE</button");

			subscribeHandling();
		}
		else if (selection.includes("producer"))
		{
			selection = "a "+ "<b>" +selection.toUpperCase();
			$("#selectioncontent").html("<p> As "+selection+"</b>" +" you will have access to raw and emerging talent. But it doesn't end there, the tools that we "+
										" are coining will further take the Abrobeat scene up a notch!"+
										"<br/> Stay connected with our development progress and be the first to have access to our pilot test run of the system by subscribing to our email list."+
								" </p> <input type='text' id='emailin' placeholder='ENTER EMAIL ADDRESS' value=''/> <br/> <button id='subscribe'> SUBSCRIBE</button");
			subscribeHandling();
		}
		else if (selection.includes("fan"))
		{
			selection = "a "+ "<b>" +selection.toUpperCase();
			$("#selectioncontent").html("<p> As "+selection+"</b>" +" you will stay connected with the latest work from your favorite artists. We even have something"+
																   " install to stay intouch with every concert they do! <br/>So go on ahead an subscribe to our email list"+
																   " and we will keep you updated with our development. <br/>"+
																   "</p> <input type='text' id='emailin' placeholder='ENTER EMAIL ADDRESS' value=''/> <br/> <button id='subscribe'> SUBSCRIBE</button");
			subscribeHandling();

		}

	});
}

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
		  	//sending request to server with relevant info
          	$.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType : 'application/json',
                url:'/subscribeemail',
                success: function(data)
                {

          		  	$("#welcomedialog").show();
          		  	$("welcomedialog").css("margin-top","-258px");
				  	$("#welcomedialog #head h1").text("EMAIL SUBSCRIPTION STATUS");
				  	$("#welcomedialog #head").css("background-color","#00b83c");
				  	$("#welcomedialog #head").css("color","white");
				  	$("#welcomedialog section p").text(data);
            	}
      		});
		  	}
		  else 
		  {
		  	$("#welcomedialog").show();
		  	$("#welcomedialog #head h1").text("EMAIL SUBSCRIPTION ERROR!");
		  	$("#welcomedialog #head").css("background-color","#f80c00");
		  	$("#welcomedialog #head").css("color","white");
		  	$("#welcomedialog section p").text("Please check if you entered a valid email address.");
		  }
	});
}