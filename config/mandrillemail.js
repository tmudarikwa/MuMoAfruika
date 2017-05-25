var mandrill = require('mandrill-api/mandrill');


var mandrill_client = new mandrill.Mandrill('lQi6Z4MbRPDIZ7P8M2qAxg');

var sendemailsubscriptionconfirmation = function(req, res){

	 var data = req.body;

      var message = {
                    "html": "<p> Thank you for registering for our email blast. We will, from time to time, keep you posted on our development progress and any other updates that we might have for you.</p>",
                    "text": "Example text content",
                    "subject": "MuMoAfruika email subsription successful",
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


module.exports.sendEmail =  sendemailsubscriptionconfirmation;