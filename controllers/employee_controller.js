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
var employeeModel = require('../models/employee_model')


let employee =  async (req, res, next) => {
	let numberPersonnel = req.session.session.numberPersonnel
	let val = [numberPersonnel]
	let s = await employeeModel.employee(req, res, val)
}

let months = async  (req, res, next) => {
	console.log(day + "/" + month + "/" + year + " " + hour + ":" + minute)
	let numberPersonnel = req.session.session.numberPersonnel
	let val = [numberPersonnel, month, year]
	employeeModel.months(req, res, val)
}

let years = function(req, res, next){
	let numberPersonnel = req.session.session.numberPersonnel
	let val = [numberPersonnel,year]
	employeeModel.years(req, res, val)
}

let search = (req, res, next)=> {
	let qyear = req.body.qyear - 543
	let numberPersonnel = req.session.session.numberPersonnel
	let val = [numberPersonnel, qyear]
	employeeModel.search(req, res, val)
}


let leave = (req, res) => {
	employeeModel.leave(req, res)
}



module.exports = {employee, months, years, search, leave}