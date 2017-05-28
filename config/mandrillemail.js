var mandrill = require('mandrill-api/mandrill');


var mandrill_client = new mandrill.Mandrill('lQi6Z4MbRPDIZ7P8M2qAxg');

var sendemailsubscriptionconfirmation = function(req, res){

	var data = req.body;

  var template_name = "MuMoAfruika Email Subscription Confirmation";
  var template_content = [{
        "name": "MuMoAfruika Email Subscription Confirmation"
    }];

    var message = { 
                    "subject": "Email Subscription confirmation",
                    "from_email": "emailsubscription@gerfusa.com",
                    "from_name": "emailsubscription@mumoafruika.com",
                    "to": [{
                            "email": ""+data.email+"",
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
                            "rcpt": ""+data.email+"",
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
        
        var emailsent ="You have successfully subscribed to our email blast. Thank you! We have sent you an email verifying that everything is setup( The email might be in your spam/trash if you can not see it in your inbox)."; 
        if(result.status !== 'sent') emailsent = "We apologize there has been an error trying to send you an email, though we successfully managed to save your email address has been saved in our database. ";
        console.log(result);
        res.send(emailsent);
      }, function(e) {
          // Mandrill returns the error as an object with name and message keys
          console.log(e);
          var emailsent = "We apologize there has been an error trying to send you an email, though we successfully managed to save your email address has been saved in our database. "+e;
          res.send(emailsent);
          // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
      });
}


module.exports.sendEmail =  sendemailsubscriptionconfirmation;