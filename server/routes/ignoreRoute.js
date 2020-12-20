const express = require('express');
const router = express.Router();
const {getSWFILESIgnores} = require('../controllers/ignoreControl');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "PRTG"
  });


router.get('/swfiles',(req,res)=>{
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
      connection.query('SELECT * FROM SWFiles',function(error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
      });
})


module.exports = router;

