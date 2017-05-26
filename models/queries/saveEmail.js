var anEmail  = require('../emailsavemodel');
var sendEmail = require('../../config/mandrillemail');

exports.saveEmail = function(req , res)
{	
    var data = req.body;
    
    console.log("************* INSIDE SAVE EMAIl*******************");
    
	anEmail.findOne({"email":data.email} , function(err, anemail){

        if (err)
        {
            var status = 'We apologize but something went wrong trying to look up your email against our records'+error;
            res.send(status);
        }

        if (anemail)
        {
            var emailsave = new anEmail();
    		//adding 30 minutes to the createDate time        	
	        emailsave.email= email;
            emailsave.usertype = usertype;
    		emailsave.save(function(err,user){
                console.log("************* INSIDE SAVE METHOD*******************");
                if (err)
                    res.send(err);
                sendEmail(req,res);
            	res.send('You have successfully subscribed to our email blast, thank you! We have sent an email notifying and verfying that everything is setup.');       			
    		});
    	}
      
	});
}
