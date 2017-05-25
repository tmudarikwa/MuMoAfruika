var mandrill = require('mandrill-api/mandrill');


var mandrill_client = new mandrill.Mandrill('lQi6Z4MbRPDIZ7P8M2qAxg');

var sendcontactemail = function(req, res){

	 var data = req.body;

      var message = {
                    "html": "<p>"+data.message+"</p>",
                    "text": "Example text content",
                    "subject": data.selection,
                    "from_email": "contactus@gerfusa.com",
                    "from_name": ""+data.email+"",
                    "to": [{
                            "email": "contactus@gerfusa.com",
                            "name": "GERF - CONTACTUS",
                            "type": "to"
                        }],
                    "headers": {
                        "Reply-To": ""+data.email+""
                    },
                    "important": false,
                    "track_opens": null,
                    "track_clicks": null,
                    "auto_text": null,
                    "auto_html": null,
                    "inline_css": null,
                    "url_strip_qs": null,
                    "preserve_recipients": null,
                    "view_content_link": null,
                    "bcc_address": ""+data.email+"",
                    "tracking_domain": null,
                    "signing_domain": null,
                    "return_path_domain": null,
                    "merge": true,
                    "merge_language": "mailchimp",
                    "global_merge_vars": [{
                            "name": "merge1",
                            "content": "merge1 content"
                        }],
                    "merge_vars": [{
                            "rcpt": "recipient.email@example.com",
                            "vars": [{
                                    "name": "merge2",
                                    "content": "merge2 content"
                                }]
                        }]
                };
      var async = false;
      var ip_pool = "Main Pool";
      //var send_at = "example send_at";
      mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        console.log(result);
        var emailsent = "Information submitted! Our team will get back to you asap. Thank you.";
        if(result.status === 'sent') emailsent = "We apologize there has been an error trying to submit your information.";
        res.send(emailsent);
      }, function(e) {
          // Mandrill returns the error as an object with name and message keys
          console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
          var emailsent = "We apologize there has been an error trying to submit your information.";
          res.send(emailsent);
          // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
      });
}

var sendSignUpLink = function(res, req ,email , firstname, lastname ,url)
{
	var emailmessage = "Hi "+firstname+" "+lastname+"<br/><br/>Thank you for creating an account with GERF! <br/><br/>Your account has been created! To get it activated click the button below: <br/>  <a href='http://localhost:3000/" + url+"/emailverify'><button>VERIFY</button></a> <br/> <p style='font-size:1em;fontstyle:italic'> If the above button is not working you can alternatively copy and paste the link below:</p><a href='http://localhost:3000/" + url+"/emailverify' style='font-size:1em;fontstyle:italic'>http://localhost:3000/" + url+"/emailverify</a>";
		emailmessage =  emailmessage + "<br/><br/> Regards <br/> GERF Co. Team";
	var emailmessagetext = "Hi Thank you for creating an account with GERF! Your account has been created! To get it activated please visit the following link : http://localhost:3000/" + url+"/emailverify";
	    emailmessagetext = emailmessagetext + " Regards, GERF TEAM support@gerfusa.com";
    var template_name = "signup-template";
	var template_content = [{
        "name": "signupmessage",
        "content": ""+emailmessage
    }];

    var message = { 
                    "html": ""+emailmessage+"",
                    "text": ""+emailmessagetext,
                    "subject": "GERF account registration completion",
                    "from_email": "support@gerfusa.com",
                    "from_name": "support@gerfusa.com",
                    "to": [{
                            "email": ""+email+"",
                            "name": ""+firstname+" "+lastname,
                            "type": "to"
                        }],
                    "headers": {
                        "Reply-To": "DO NOT REPLY. THIS IS AN AUTOMATED EMAIL"
                    },
                    "important": false,
                    "track_opens": true,
                    "track_clicks": true,
                    "auto_text": null,
                    "auto_html": null,
                    "inline_css": null,
                    "url_strip_qs": null,
                    "preserve_recipients": null,
                    "view_content_link": null,
                    "tracking_domain": null,
                    "signing_domain": null,
                    "return_path_domain": null,
                    "merge": true,
                    "merge_language": "mailchimp",
                    "global_merge_vars": [{
                            "name": "merge1",
                            "content": "merge1 content"
                        }],
                    "merge_vars": [{
                            "rcpt": "recipient.email@example.com",
                            "vars": [{
                                    "name": "merge2",
                                    "content": "merge2 content"
                                }]
                        }]
                };
      var async = false;
      var ip_pool = "Main Pool";
      //var send_at = "example send_at";
      mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content,"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        
        var emailsent = "Thank you for creating an account. Your account has been created but it needs to be activated. We've sent an email to your email account ("+email+") with the instructions for you to follow inorder to complete registration.";
        if(result.status === 'sent') emailsent = "We apologize there has been an error trying to submit your information.";
        req.flash("signupMessage",emailsent);
        res.redirect("signup");
      }, function(e) {
          // Mandrill returns the error as an object with name and message keys
          var emailsent = "We apologize there has been an error trying to submit your information.";
          req.flash("signupMessage",emailsent);
          res.redirect("/signup");
          // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
      });

}

var resendLink = function(res, req ,email , firstname, lastname ,url)
{
	var emailmessage = "Hi "+firstname+" "+lastname+"<br/><br/>Thank you for creating an account with GERF! <br/><br/>Your account has been created! To get it activated click the button below: <br/>  <a href='http://localhost:3000/" + url+"/emailverify'><button>VERIFY</button></a> <br/> <p style='font-size:1em;fontstyle:italic'> If the above button is not working you can alternatively copy and paste the link below:</p><a href='http://localhost:3000/" + url+"/emailverify' style='font-size:1em;fontstyle:italic'>http://localhost:3000/" + url+"/emailverify</a>";
		emailmessage =  emailmessage + "<br/><br/> Regards <br/> GERF Co. Team";
	var emailmessagetext = "Hi Thank you for creating an account with GERF! Your account has been created! To get it activated please visit the following link : http://localhost:3000/" + url+"/emailverify";
	    emailmessagetext = emailmessagetext + " Regards, GERF TEAM support@gerfusa.com";
    var template_name = "signup-template";
	var template_content = [{
        "name": "signupmessage",
        "content": ""+emailmessage
    }];

    var message = { 
                    "html": ""+emailmessage+"",
                    "text": ""+emailmessagetext,
                    "subject": "GERF account registration completion",
                    "from_email": "support@gerfusa.com",
                    "from_name": "support@gerfusa.com",
                    "to": [{
                            "email": ""+email+"",
                            "name": ""+firstname+" "+lastname,
                            "type": "to"
                        }],
                    "headers": {
                        "Reply-To": "DO NOT REPLY. THIS IS AN AUTOMATED EMAIL"
                    },
                    "important": false,
                    "track_opens": true,
                    "track_clicks": true,
                    "auto_text": null,
                    "auto_html": null,
                    "inline_css": null,
                    "url_strip_qs": null,
                    "preserve_recipients": null,
                    "view_content_link": null,
                    "tracking_domain": null,
                    "signing_domain": null,
                    "return_path_domain": null,
                    "merge": true,
                    "merge_language": "mailchimp",
                    "global_merge_vars": [{
                            "name": "merge1",
                            "content": "merge1 content"
                        }],
                    "merge_vars": [{
                            "rcpt": "recipient.email@example.com",
                            "vars": [{
                                    "name": "merge2",
                                    "content": "merge2 content"
                                }]
                        }]
                };
      var async = false;
      var ip_pool = "Main Pool";
      //var send_at = "example send_at";
      mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content,"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        
        var emailsent = "Your link has expired. We've resent an email to your email account ("+email+").";
        if(result.status === 'sent') emailsent = "Your link has expired but there was an error trying to resend the link to your email.";
        req.flash("signupMessage",emailsent);
        res.redirect("/login");
      }, function(e) {
          // Mandrill returns the error as an object with name and message keys
          
          var emailsent = "Your link expired but unfortunately there was an error trying to resend the link to your email. Please contact support.";
          req.flash("signupMessage",emailsent);
          res.redirect("/login");
          // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
      });

}

module.exports.sendContactEmail = sendcontactemail;
module.exports.sendSignUpLink = sendSignUpLink;
module.exports.resendLink = resendLink;