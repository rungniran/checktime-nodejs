var express = require('express');
var router = express.Router()

let auth  = (req, res, next) => {
	if(!req.session.session) {
	    return res.redirect('/login')   	
	}
	else{
	   next()
	}
}

router.get('/dashboard', auth, (req, res, next) => {
    res.render('dashboard', {
		session: req.session.session
	})
	
})

module.exports = router