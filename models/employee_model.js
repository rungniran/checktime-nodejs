var mysql = require('../connect')
var dateFormat = require('dateformat')
var monthNamesThai = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤษจิกายน","ธันวาคม"];
var month = dateFormat(new Date(), "mm")
var year = dateFormat(new Date(), "yyyy")

let employee = async (req, res, val) => {
    let sql = "SELECT list.*, work.* FROM worktime AS work INNER JOIN listpersonnel AS list ON work.idListPersonnel = list.idListPersonnel WHERE numberPersonnel IN (?) order by idWorkTime desc LIMIT 10"
    mysql.query(sql, val, (err, result) => {   
        res.render('personnel',{
            message: {},
            session: req.session.session,
            data: result
        }) 
    })
}

let months = async (req, res, val) => {
    let sql = "SELECT list.*, work.* FROM worktime AS work INNER JOIN listpersonnel AS list ON work.idListPersonnel = list.idListPersonnel WHERE numberPersonnel  IN (?) AND month IN (?) AND year IN (?) order by day ASC"
	mysql.query(sql, val, function(err, result){
        res.render('month',{
			data: result,
			m: result.length * req.session.session.pay, 
			namemonth: monthNamesThai[month-1],
			countDay: result.length,
			session: req.session.session
		})
	})
}

let years = function(req, res, val){
    let sql = "SELECT list.*, work.*,month, count(*) AS countmonth FROM worktime order by month DESC AS work INNER JOIN listpersonnel AS list ON work.idListPersonnel = list.idListPersonnel WHERE numberPersonnel IN (?) AND year IN (?)  GROUP BY month" //month IN ('11','12') AND
	mysql.query(sql, val, function(err, result){
		res.render('year',{
			data: result,
			monthThai: monthNamesThai,
			year: parseInt(year) + 543 ,
			session: req.session.session
		})
	})
}
let search = (req, res, val) => {
    let  sql = "SELECT work.*, list.* ,month, count(*) AS countmonth FROM worktime AS work INNER JOIN listpersonnel AS list ON work.idListPersonnel = list.idListPersonnel WHERE numberPersonnel IN (?) AND year IN (?) GROUP BY month"
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
}

let leave = (req, res, val) => {
    let value = req.body
    let key = [employee_id]
    value.forEach((key, index ) => {
        console.log(key[0])
    });
    let sql = "INSERT INTO leave (CustomerName, ContactName, ) VALUES ('Cardinal','TomB');" 
}

module.exports = {employee, months, years, search, leave}