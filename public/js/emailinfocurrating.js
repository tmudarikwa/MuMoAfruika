$("footer a").on("mouseenter",function(){
    $(this).css("color","#f80c00");
	$(this).css("cursor","pointer");
}).on("mouseleave",function(){
     $(this).css("color","white");
	
});

$(".userselection").select2({
	placeholder:"Click to select"
});

$(".userselection").on("select2:select",function(e) {
	var selection = $(this).val();

	if(selection.includes("artist"))
	{
		selection = "an "+ "<b>" +selection.toUpperCase();
		$("#selectioncontent").html("<p> As "+selection+"</b>" +" you will have a lot of features at your disposal. Development is currently underway and as we "+
									"complete set milestones that are linked to these features we will send you emails. Furthermore, you will get access to"+
									" upload your content when our beta pilot version of the platform see ready.<br/> Enter your email and click subscribe"+
							" to stay upto date with MuMoAfruika. </p> <input type='text' id='emailin' placeholder='ENTER EMAIL ADDRESS' value=''/> <br/> <button id='subscribe'> SUBSCRIBE</button");
	}
	else if (selection.includes("producer"))
	{
		selection = "a "+ "<b>" +selection.toUpperCase();
		$("#selectioncontent").html("<p> As "+selection+"</b>" +" you will have access to raw and emerging talent. But it doesn't end there, the tools that we "+
									" are coining will further take the Abrobeat scene up a notch!"+
									"<br/> Stay connected with our development progress and be the first to have access to our pilot test run of the system by subscribing to our email list."+
							" </p> <input type='text' id='emailin' placeholder='ENTER EMAIL ADDRESS' value=''/> <br/> <button id='subscribe'> SUBSCRIBE</button");
	}
	else if (selection.includes("fan"))
	{
		selection = "a "+ "<b>" +selection.toUpperCase();
		$("#selectioncontent").html("<p> As "+selection+"</b>" +" you will stay connected with the latest work from your favorite artists. We even have something"+
															   " install to stay intouch with every concert they do! <br/>So go on ahead an subscribe to our email list"+
															   " and we will keep you updated with our development. <br/>"+
															   "</p> <input type='text' id='emailin' placeholder='ENTER EMAIL ADDRESS' value=''/> <br/> <button id='subscribe'> SUBSCRIBE</button");

	}

});

$("#emailin").on("click",function(){
	  var format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	  if(!format.test($(this).val()))
	  {
	  	alert("Please enter a valid email address");
	  }

});

$("#subscribe").on("click", function(){


});