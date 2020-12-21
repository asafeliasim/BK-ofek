const express = require('express');
const cors = require('cors');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv');
const mysql = require('mysql');
const moment = require('moment');


const {swAuth,getPartnerIds} = require('./swFunctions/utils');
dotenv.config();

app.use(express.json());
app.use(cors());



const port = process.env.PORT || 4000;

  const customizeDate = (arr) => {
    arr.map(item=>{
      item.time = moment(item.time).format('MM/DD/YYYY')
    })
  }
  const mysqlDB = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "PRTG"
  });
  
  mysqlDB.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  
  app.get('/api/ignores/:url',(req,res)=>{
    console.log(req.params.url);
    mysqlDB.query(`SELECT * FROM ${req.params.url}`,function(error, results, fields) {
      if (error) throw error;
       customizeDate(results);
      res.status(201).json(results)
    });
  })
  
 /*app.get('/api/ignores/test',(req,res)=>{
  mysqlDB.query('SELECT * FROM SWLBT',function(error, results, fields) {
    if (error) throw error;
    customizeDate(results);
    console.log(results);
    res.status(201).json(results)
  });
 })*/
  // ********************************* DONE ******************************************//
 /* app.get('/api/ignores/swfiles',(req,res)=>{
 
    mysqlDB.query('SELECT * FROM SWFiles',function(error, results, fields) {
      if (error) throw error;
       customizeDate(results);
      res.status(201).json(results)
    });
  }) */
 // ********************************* DONE ******************************************//
  /*app.get('/api/ignores/swhv',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWHyperV',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })*/
// ********************************* DONE ******************************************//
  /*app.get('/api/ignores/swlbt',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWLBT',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })*/
  
// ********************************* DONE ******************************************//
  /*app.get('/api/ignores/swlstate',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWLinuxSysState',function(error, results, fields) {
      if (error) throw error;
     
      customizeDate(results);
      res.status(201).json(results);
    });
  })*/
// ********************************* DONE ******************************************//
  /*app.get('/api/ignores/swms365sharepoint',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWMS365SharePoint',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })*/
// ********************************* DONE ******************************************//
 /* app.get('/api/ignores/swmsexch365',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWMSExch365',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })*/
// ********************************* DONE ******************************************//
  /*app.get('/api/ignores/swmsonedrive365',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWMSOneDrive365',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })*/
// ********************************* DONE ******************************************//
  /*app.get('/api/ignores/swmssql',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWMSSQL',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })*/
// ********************************* DONE ******************************************//
  /*app.get('/api/ignores/swmyssql',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWMYSQL',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })*/
// ********************************* DONE ******************************************//
  /*app.get('/api/ignores/swnetwork',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWNetworkShares',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })*/
  // ********************************* DONE ******************************************//
  /*app.get('/api/ignores/swooracle',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWOracle',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })*/
 // ********************************* DONE ******************************************//
  /*app.get('/api/ignores/swsysstate',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWSysState',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })*/

   // ********************************* DONE ******************************************//
   /*app.get('/api/ignores/swvexchange',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWVSSExchange',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })*/

   // ********************************* DONE ******************************************//
  /* app.get('/api/ignores/swvssmssql',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWVSSMSSQL',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })*/

   // ********************************* DONE ******************************************//
  /*app.get('/api/ignores/swvssharepoint',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWVSSSharePoint',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })*/
// ********************************* DONE ******************************************//
  /*app.get('/api/ignores/sevss',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWVSSSysState',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })*/

  /*app.get('/api/ignores/swvmwarevm',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWVmwareVM',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })
*/

  app.post('/api/swbackup/login',async(req,res)=>{
  
      swAuth.then(data=>{
        const{visa,partnerID} = data;
        getPartnerIds(visa,partnerID);
      
      }).catch(e=>{
        console.error(e);
      });
  })
  app.listen(port,()=>{
    console.log(`Server is on in ${port}`.green);
  })
