/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// User Login, Access to application
	userLogin: function (req, res) {
		
	    User.findOne({
	    		email: req.param('email')
	    	}, 
	    	function loginUser(err, user){
	      	if (err) return res.negotiate(err);
	      	if (!user) return res.notFound();

	      	require('machinepack-passwords').checkPassword({
	        passwordAttempt: req.param('password'),
	        encryptedPassword: user.encryptedPassword})
	        .exec({

	        	error: function (err){
	        		console.log("Error")
	        		return res.negociate(err);
	        	},

	        	incorrect: function (){
	        		console.log("User Not fount")
	        		return res.notFound();
	        	},

	        	success: function (){
	        		req.session.me = user;
	        		req.session.authenticated = true;
	        		console.log(req.session.authenticated);
	        		return res.ok();
	        	}
	        });
	    });

	  },

};

