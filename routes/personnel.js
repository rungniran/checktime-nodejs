var express = require('express')
var dateFormat = require('dateformat')
var mysql   = require('../connect')
var router  = express.Router()

// dd/mm/yyyy h:MM:ss
var day    = dateFormat(new Date(), "dd")
var month  = dateFormat(new Date(), "mm")
var namemonth  = dateFormat(new Date(), "mmmm")
var year   = dateFormat(new Date(), "yyyy")
var hour   = dateFormat(new Date(), "H")
var minute = dateFormat(new Date(), "MM") 
router.get('/login', function(req, res, next) {
    res.render('login',{message: {}} )
})

router.get('/logout', function(req, res, next) {
	if(req.session.session){
		req.session.destroy(function(){
			res.render('login')
		})
	}
	else{
        res.render('login') 
	}
})

router.get('/month', function(req, res, next){
	if (!req.session.session) {
	    res.render('login')     
	}
	else{
		console.log(day + "/" + month + "/" + year + " " + hour + ":" + minute)
		let numberPersonnel = req.session.session.numberPersonnel
		let val = [numberPersonnel]
		let sql = "SELECT * FROM worktime WHERE numberPersonnel = ?"
		mysql.query(sql, val, function(err, result){
			console.log(result.length)
			console.log(result)
			res.render('month',{
				data: result,
				namemonth: namemonth,
				countDay : result.length,
			    session: req.session.session
		    })
		})	
	}
})

router.get('/personnel', function(req, res, next) {
	if (!req.session.session) {
		res.render('login')
	}
	else{ 
		let numberPersonnel = req.session.session.numberPersonnel
        console.log(numberPersonnel)
        let val = [numberPersonnel]
        let sql = "SELECT * FROM worktime WHERE numberPersonnel IN (?) order by idWorktime desc "
        mysql.query(sql, val, function(err, result){
            console.log(result)       
	        res.render('personnel',{
	        	message: {},
	            session: req.session.session,
	            data: result
	        }) 
        })
    }
})


router.post('/login', function(req, res, next){
	let name            = req.body.name
	let numberPersonnel = req.body.numberPersonnel
	let data            = [name, numberPersonnel]
	let sql             = "SELECT * FROM listpersonnel WHERE name = ? AND numberPersonnel = ?"
	mysql.query(sql, data, function(err, result){
		if (result.length == 1) {
			req.session.session = result[0]
			console.log(req.session.session)
			res.redirect('personnel')
		}
		else{
			res.render('login', {message : "This account could not be found, please check again!!"})
		}
	})
})

module.exports = router;
