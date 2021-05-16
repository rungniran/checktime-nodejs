var express = require('express')
var dateFormat = require('dateformat')
var mysql = require('../connect')
const { response } = require('express')
var router = express.Router()
var nameday = dateFormat(new Date(), "dddd")
var day = dateFormat(new Date(), "dd")
var month = dateFormat(new Date(), "mm")
var namemonth = dateFormat(new Date(), "mmmm")
var year = dateFormat(new Date(), "yyyy")
var hour = dateFormat(new Date(), "H")
var minute = dateFormat(new Date(), "MM") 
var monthNamesThai = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤษจิกายน","ธันวาคม"];
var monthThai = monthNamesThai[month-1]


router.get('/login', function(req, res, next) {
    res.render('login',{message: {}} )
})

router.post('/login', function(req, res, next){
	let name = req.body.name
	let numberPersonnel = req.body.numberPersonnel
	let data = [name, numberPersonnel]
	let sql = "SELECT * FROM  listpersonnel WHERE name = ? AND numberPersonnel = ?"
	mysql.query(sql, data, function(err, result){
		console.log(result.length)
		if (result.length == 1) {
			console.log(result)
			req.session.session = result[0]
			res.redirect('personnel')
		}
		else{
			res.render('login', {message : "This account could not be found, please check again!!"})
		}
	})
})

router.get('/dashboard', function(req, res, next){
	if(!req.session.session){
		res.render('login')
	}
	else{
		res.render('dashboard', {
			session: req.session.session
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
        let sql = "SELECT list.*, work.* FROM worktime AS work INNER JOIN listpersonnel AS list ON work.idListPersonnel = list.idListPersonnel WHERE numberPersonnel IN (?) order by idWorkTime desc LIMIT 10"
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

router.get('/month', function(req, res, next){
	if (!req.session.session) {
	    res.render('login')     
	}
	else{
		console.log(day + "/" + month + "/" + year + " " + hour + ":" + minute)
		let numberPersonnel = req.session.session.numberPersonnel
		let val = [numberPersonnel, month, year]
		let sql = "SELECT list.*, work.* FROM worktime AS work INNER JOIN listpersonnel AS list ON work.idListPersonnel = list.idListPersonnel WHERE numberPersonnel  IN (?) AND month IN (?) AND year IN (?) order by day ASC"
		mysql.query(sql, val, function(err, result){
	
			console.log(result)
			res.render('month',{
				data: result,
				m: result.length * req.session.session.pay, 
				namemonth: monthNamesThai[month-1],
				countDay: result.length,
			    session: req.session.session
		    })
		})	
	}
})

router.get('/year', function(req, res, next){
	if(!req.session.session){
		res.render('login')
	}
	else{
		let numberPersonnel = req.session.session.numberPersonnel
		let val = [numberPersonnel,year]
	    let sql = "SELECT list.*, work.*,month, count(*) AS countmonth FROM worktime AS work INNER JOIN listpersonnel AS list ON work.idListPersonnel = list.idListPersonnel WHERE numberPersonnel IN (?) AND year IN (?) GROUP BY month" //month IN ('11','12') AND
	    mysql.query(sql, val, function(err, result){
	    	console.log(result)
	    	res.render('year',{
	    		data: result,
	    		monthThai: monthNamesThai,
	    		year: parseInt(year) + 543 ,
	    		session: req.session.session
	    	})
	    	
	    })
	}
})

router.get('/search', function(req, res, next) {
	if(!req.session.session){
		res.render('login')
	}
	else{
		res.render('search',{
			session: req.session.session,
			qyear: 'h'
		})
	}
})

router.post('/search', function(req, res, next) {
    let qyear = req.body.qyear - 543
    let numberPersonnel = req.session.session.numberPersonnel
    console.log(qyear)
    let val = [numberPersonnel, qyear]
    let sql = "SELECT work.*, list.* ,month, count(*) AS countmonth FROM worktime AS work INNER JOIN listpersonnel AS list ON work.idListPersonnel = list.idListPersonnel WHERE numberPersonnel IN (?) AND year IN (?) GROUP BY month"
    mysql.query(sql, val, function(err, result){
    	if (err) {
	    	res.render('search',{
	    		session: req.session.session,
	    		qyear:'h'
	    	})
        }
        else{
        	console.log(result)
	    	res.render('search',{
	    		data: result,
	    		monthThai: monthNamesThai,
	    		session: req.session.session,
	    		qyear:''
	    	})
        }
    })
})

router.get('/inform', function(req, res, next) {
	if (!req.session.session){
		res.render('inform')
	}
	else{
		res.render('inform',{
			session: req.session.session
		})
	}
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

module.exports = router;
