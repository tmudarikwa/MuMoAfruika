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
            if(anemail.usertype == data.usertype)
            {
                var status = 'You have already subscribed to our email blast. Thank you for the ethusiasm!';
                res.send(status);
            }
            else
            {
                anEmail.findByIdAndUpdate(anemail._id,
                                   {$set:{'usertype':data.usertype}},
                                   {new:true},
                                   function(err, updateddata){
                                    if(err){ 
                                      res.send(err);
                                    }
                                        res.send("We found an email already subscribed to our email blast but with a different user type ("+anemail.usertype+"). We have updated the user type to the one you just selected ("+updateddata.usertype+").");
                
                                   }); 
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

exports.unsubscribeEmail = function(req, res ,done)
{
    var data = req.params;
    
    anEmail.findOneAndRemove({"email":data.email}, function(err, deleteddata){
        return done(null,"We are sorry that you chose to unsubscribe to our email blast. "+data.email+" has been succesfully removed from our email blast");
    });
}
