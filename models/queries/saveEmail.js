var anEmail  = require('../emailsavemodel');
var sendEmail = require('../../config/mandrillemail');

exports.saveEmail = function(req , res)
{	
    var data = req.body;
    
	anEmail.findOne({"email":data.email} , function(err, anemail){

        if (err)
        {
            var status = 'We apologize but something went wrong trying to look up your email against our records -- '+err;
            res.send(status);
        }

        if (anemail)
        {
            console.log(anemail);
            if(anemail.usertype == data.usertype)
            {
                var status = 'You have already subscribed to our email blast. Thank you for the ethusiasm!';
                res.send(status);
            }
            else
            {
                anemail.usertype = data.usertype;
                res.send("We found an email already subscribed to our email blast but with a different user type ("+anemail.usertype+"). We have updated the user type to the one you just selected("+data.usertype+")");

            }
        }
        else 
        {
            
            var emailsave = new anEmail();
            //adding 30 minutes to the createDate time          
            emailsave.email= data.email;
            emailsave.usertype = data.usertype;
            emailsave.save(function(err,user){
                if (err)
                    res.send(err);
                sendEmail.sendEmail(req,res);              
            });
        }
      
	});
}

exports.unsubscribeEmail = function(req, res)
{
    var data = req.params;
    console.log(data);
}
