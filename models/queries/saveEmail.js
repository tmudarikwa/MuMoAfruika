var anEmail  = require('../emailsavemodel');
var sendEmail = require('../../config/mandrillemail');

exports.saveEmail = function(req , res)
{	
    var data = req.body;
    
    console.log("************* INSIDE SAVE EMAIl*******************");
    
	anEmail.findOne({"email":data.email} , function(err, anemail){

        console.log("found one result |");
        console.log(anemail);

        if (err)
        {
            var status = 'We apologize but something went wrong trying to look up your email against our records'+err;
            res.send(status);
        }

        if (anemail)
        {
            var status = 'You have already subscribed to our email blast. Thank you for the ethusiasm';
            res.send(status);
        }
        else 
        {
            
            var emailsave = new anEmail();
            //adding 30 minutes to the createDate time          
            emailsave.email= data.email;
            emailsave.usertype = data.usertype;
            emailsave.save(function(err,user){
                console.log("************* INSIDE SAVE METHOD*******************");
                if (err)
                    res.send(err);
                sendEmail.sendEmail(req,res);
                res.send('You have successfully subscribed to our email blast, thank you! We have sent an email notifying and verfying that everything is setup.');                 
            });
        }
      
	});
}
