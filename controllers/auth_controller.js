var express = require('express')
var dateFormat = require('dateformat')
var mysql = require('../connect')
const { response } = require('express')

let authLogger  = (req, res, next) => {
	if(!req.session.logger) {
	    res.redirect('login')   	
	}
	else{
       console.log(req.session.logger)
	   next()
	}
}

let login =  function(req, res, next){
	let name = req.body.name
	let numberPersonnel = req.body.numberPersonnel
	let data = [name, numberPersonnel]
	let sql = "SELECT * FROM  listpersonnel WHERE name = ? AND numberPersonnel = ?"
	mysql.query(sql, data, function(err, result){
		if (result.length == 1) {
			req.session.session = result[0]
			req.session.logger = true
			res.redirect('/dashboard')
		}
		else{
			res.render('login', {message : "This account could not be found, please check again!!"})
		}
	})
}


module.exports = {authLogger, login}