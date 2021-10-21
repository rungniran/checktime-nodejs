var express = require('express');
var router = express.Router()
var mysql = require('../connect')
var dateFormat = require('dateformat');
const { resume } = require('../connect');
var monthNamesThai = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤษจิกายน","ธันวาคม"];
var monthNamesThaiY = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย","ธ.ค."];
var month = dateFormat(new Date(), "mm")
var year = dateFormat(new Date(), "yyyy")

let auth  = (req, res, next) => {
	if(!req.session.session) {
	    return res.redirect('/login')   	
	}
	else{
	   next()
	}
}

router.get('/dashboard', auth, async (req, res, next) => {
	try{
		let numberPersonnel = req.session.session.numberPersonnel
		let val = [numberPersonnel, month, year]
		let sql = "SELECT * FROM `worktime` WHERE idListPersonnel  = " + numberPersonnel + " and  year = " + year
		mysql.query(sql, val, async (err, result) => {
			array = []
			arrayname = []
			for(let i = 0; i < result.length; i++ ){
				array.push(result[i].month)
				arrayname.push('"' + monthNamesThaiY[result[i].month- 1] + '"')
			}
			value = []
		    for(let i = 0; i < Array.from(new Set(array)).length; i++){
				const found = await result.filter(({ month }) => new RegExp(Array.from(new Set(array))[i], 'i').test(month))
				value.push( await found.length)
			}
			// let sql = "SELECT * FROM `worktime` WHERE idListPersonnel  = " + numberPersonnel + " and  year = " + year + " and month = " + 
			res.render('dashboard', {
				month: Array.from(new Set(array)),
				value: value,
				session: req.session.session
			})
		})
	}catch(err){
		console.log(err)
	}
	
})

module.exports = router