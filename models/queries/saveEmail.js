var anEmail  = require('../emailsavemodel');
var sendEmail = require('../../config/mandrillemail');

var saveEmail = function(req , res)
{	
    var data = req.body;
    
	anEmail.findOne({"email":data.email} , function(err, anemail){

        if (err)
        {
            var status = 'We apologize but something went wrong trying to look up your email against our records'+error;
            res.send(status);
        }

        if (anemail)
        {
    		//adding 30 minutes to the createDate time        	
	        anEmail.email= email;
            anEmail.usertype = usertype;
    		anEmail.save(function(err,user){
                if (err)
                    res.send(err);
                sendEmail(req,res);
            	res.send('You have successfully subscribed to our email blast, thank you! We have sent an email notifying and verfying that everything is setup.');       			
    		})
    	}
      
	});
}

module.exports.saveEmail = saveEmail;