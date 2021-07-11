var express = require('express')
var mysql =require('../connect')
var dateFormat = require('dateformat')
var router = express.Router()
const auth = require('../controllers/auth_controller')



router.post('/login', auth.login)

router.get('/login', function(req, res, next) {
    res.render('login',{message: {}} )
})


router.get('/logout',async function(req, res) {
	if(req.session.session){	
		req.session.destroy() 
		return res.redirect('dashboard')
	}
})

module.exports = router;