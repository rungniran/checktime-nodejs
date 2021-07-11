var express = require('express')
var dateFormat = require('dateformat')
var mysql = require('../connect')
const { response } = require('express')
var router = express.Router()
const employee = require('../controllers/employee_controller')


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


router.get('/latest', auth, employee.employee)

router.get('/month', auth, employee.months)

router.get('/year', auth, employee.years)


router.get('/search', auth, (req, res, next) => {
	res.render('search',{
		session: req.session.session,
		qyear: 'h'
	})
})

router.post('/search', auth, employee.search)

router.get('/inform', auth, function(req, res, next) {

		res.render('inform',{
			session: req.session.session
		})
})



module.exports = router;
