var express = require('express')
var mysql =require('../connect')
var dateFormat = require('dateformat')
var router = express.Router()

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' })
});

module.exports = router;
