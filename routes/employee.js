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

let authHR  = (req, res, next) => {
	if( req.session.session.position !== "Human Resource") {
		res.redirect('/401') 	
	}
	else{
	   next()
	}
}

router.get('/401', function(req, res){
	res.render('401', {
		session: req.session.session
	})
  });

router.get('/latest', auth, employee.employee)

router.get('/month', auth, employee.months)

router.get('/year', auth, employee.years)


router.get('/search', auth, employee.search)

router.post('/search', auth, employee.search)

router.get('/leave', auth, (req, res) =>{
	res.render('leave', {
		session: req.session.session,
		alert: ""
	})
})

router.get('/leavelist', auth, (req, res) =>{
	let sql = "SELECT * FROM `leave` where employee_id = '"+ req.session.session.idListPersonnel +"'"
	mysql.query(sql, (err, result)=>{
		console.log(result)
	    res.render('leavelist', {
		    session: req.session.session,
			data: result

	    })
	})
	
})

router.post('/leave', auth,(req, res)=>{
	let date = req.body.date.split("-")
	let detail  =  req.body.detail
	let leave_detail  =  req.body.type
	let employee = req.session.session.idListPersonnel
	let year = date[0]
	let month = date[1]
	let day = date[2]

	let filter = "SELECT * FROM `leave` where  employee_id = '"+ req.session.session.idListPersonnel +"' and day = '" + day +"' and month = '" + month + "' AND year = '" + year + "'"
	console.log(filter)
	mysql.query(filter, (err, result)=>{
		if (result.length === 0){
            let sql = "INSERT INTO `leave`(`employee_id`, `day`, `month`, `year`, `leave_detail`, `leave_type`, leave_status) VALUES ('"+employee+"','"+day+"','"+month+"','"+year+"','"+detail+"','"+ leave_detail +"', 'รออนุมัติ')"
			mysql.query(sql, (err, result)=>{
				if(err){
					console.log(err)
				}else{
					res.redirect('/leavelist')
				}
			})
		}else{
			res.render('leave', {
				session: req.session.session,
				alert: "วันที่นี้คุณขอไปแล้ว"
			})
			
		}
	})
	// let sql = "INSERT INTO `leave`(`employee_id`, `day`, `month`, `year`, `leave_detail`, `leave_type`, leave_status) VALUES ('"+employee+"','"+day+"','"+month+"','"+year+"','"+detail+"','"+ leave_detail +"', 'รออนุมัติ')"
    // // let sql = "INSERT INTO leave (employee_id, day, month, year, leave_detail) VALUES ('"+employee+"','"+ day +"','"+ month +"','"+ year +"','"+ detail +"')"
	// mysql.query(sql, (err, result)=>{
	// 	if(err){
    //          console.log(err)
	// 	}else{
	// 		res.redirect('/leavelist')
	// 	}
		
	// })
})

router.get('/leavedelete/:idleave', auth,(req, res)=>{
	let key = req.params.idleave
    console.log(key)
    let sql = "DELETE FROM `leave` WHERE leave_id  = " + req.params.idleave
	mysql.query(sql, (err, result)=>{
		if(err){
             console.log(err)
		}else{
			res.redirect('/leavelist')
		}
		
	})
})

router.get('/leaveupdate/:idleave', auth, authHR,(req, res)=>{
	let key = req.params.idleave
	
	let sql = "UPDATE `leave` SET `leave_status`='อนุมัติแล้ว' WHERE leave_id = " + req.params.idleave
	console.log(sql)
	mysql.query(sql, (err, result)=>{
		res.redirect('/hr')
	})

} )

router.get('/leaveNotupdate/:idleave', auth, authHR,(req, res)=>{
	let key = req.params.idleave
	let sql = "UPDATE `leave` SET `leave_status`='ไม่อนุมัติ' WHERE leave_id = " + req.params.idleave
	mysql.query(sql, (err, result)=>{
		res.redirect('/hr')
	})
})

router.get('/hr',auth, authHR, (req, res) =>{
	let sql = "SELECT `leave`.* , employee.* FROM `leave` AS `leave`  INNER JOIN listpersonnel AS employee ON `leave`.employee_id = employee.idListPersonnel  WHERE `leave_status`='รออนุมัติ' "
	mysql.query(sql, (err, result)=>{
		console.log(result)
		res.render('hr', {
		    session: req.session.session,
			data: result

	    })
	})
})

router.get('/setup',auth, authHR, (req, res) =>{
	res.render('setup', {
		session: req.session.session
	})
})


module.exports = router;
