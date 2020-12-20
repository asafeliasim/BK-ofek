const express = require('express');
const cors = require('cors');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv');
const mysql = require('mysql');
const moment = require('moment');
const ignoreRoute = require('./routes/ignoreRoute');
const axios = require('axios');
const request = require('request');
const { lowerFirst } = require('lodash');
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

  
  /*app.get('/api/ignores/:url',(req,res)=>{
    mysqlDB.query(`SELECT * FROM ${req.params.url}`,function(error, results, fields) {
      if (error) throw error;
       customizeDate(results);
      res.status(201).json(results)
    });
  })*/
  
 /*app.get('/api/ignores/test',(req,res)=>{
  mysqlDB.query('SELECT * FROM SWLBT',function(error, results, fields) {
    if (error) throw error;
    customizeDate(results);
    console.log(results);
    res.status(201).json(results)
  });
 })*/
  // ********************************* DONE ******************************************//
  app.get('/api/ignores/swfiles',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWFiles',function(error, results, fields) {
      if (error) throw error;
       customizeDate(results);
      res.status(201).json(results)
    });
  })
 // ********************************* DONE ******************************************//
  app.get('/api/ignores/swhv',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWHyperV',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })
// ********************************* DONE ******************************************//
  app.get('/api/ignores/swlbt',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWLBT',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })
  
// ********************************* DONE ******************************************//
  app.get('/api/ignores/swlstate',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWLinuxSysState',function(error, results, fields) {
      if (error) throw error;
     
      customizeDate(results);
      res.status(201).json(results);
    });
  })
// ********************************* DONE ******************************************//
  app.get('/api/ignores/swms365sharepoint',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWMS365SharePoint',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })
// ********************************* DONE ******************************************//
  app.get('/api/ignores/swmsexch365',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWMSExch365',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })
// ********************************* DONE ******************************************//
  app.get('/api/ignores/swmsonedrive365',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWMSOneDrive365',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })
// ********************************* DONE ******************************************//
  app.get('/api/ignores/swmssql',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWMSSQL',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })
// ********************************* DONE ******************************************//
  app.get('/api/ignores/swmyssql',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWMYSQL',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })
// ********************************* DONE ******************************************//
  app.get('/api/ignores/swnetwork',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWNetworkShares',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })
  // ********************************* DONE ******************************************//
  app.get('/api/ignores/swooracle',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWOracle',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })
 // ********************************* DONE ******************************************//
  app.get('/api/ignores/swsysstate',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWSysState',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })

   // ********************************* DONE ******************************************//
   app.get('/api/ignores/swvexchange',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWVSSExchange',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })

   // ********************************* DONE ******************************************//
   app.get('/api/ignores/swvssmssql',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWVSSMSSQL',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })

   // ********************************* DONE ******************************************//
  app.get('/api/ignores/swvssharepoint',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWVSSSharePoint',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })
// ********************************* DONE ******************************************//
  app.get('/api/ignores/sevss',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWVSSSysState',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })

  app.get('/api/ignores/swvmwarevm',(req,res)=>{
    mysqlDB.query('SELECT * FROM SWVmwareVM',function(error, results, fields) {
      if (error) throw error;
      customizeDate(results);
      res.status(201).json(results);
    });
  })

  const headers = {
    'Content-Type':'applicaton/json'
  }
  const options = {
      url:"https://api.backup.management/jsonapi",
      method:"POST",
      jsonrpc:"2.0",
      headers:headers,
      port:443,
      json: {
        "jsonrpc":"2.0",
        "method":"Login",
        "params":{
          "partner":"Ofek Technologies",
          "username":"arik@obiz.co.il",
          "password":"iPHKtdThfz6e7We"
        },
        "id":"1"
      }
      /* "method":"Login",
      "path":"/jsonapi",
      "params":{
        "partner": process.env.SW_BACKUP_PARTNER,
        "username":process.env.SW_BACKUP_USER_NAME,
        "password": process.env.SW_BACKUP_PASSWORD
      },
      "id":1
      */
  }

  const swAuth = new Promise(function(resolove,reject){
    request(options,function(err,res,body){
      
      console.log(options);
      if (err) { return reject(error); }
  
      return resolove({
        visa: body.visa,
        partnerID:body.result.result.PartnerId
      })
    });
  });
  const getPartnerIds = async(visa,partnerID) => {
    const options = {
      url:"https://api.backup.management/jsonapi",
      method:"POST",
      jsonrpc:"2.0",
      headers:headers,
      port:443,
      json: {
        "jsonrpc":"2.0",
        "visa":visa,
        "id":"jsonrpc",
        "method":"EnumeratePartners",
        "params":{
          "parentPartnerId":partnerID,
          "fetchRecursively":"false"
        },
      }
    }   
    request(options,function(err,res,body){
      if (err) { return reject(error); }
      //console.log(body.result.result);
      //console.log(body.result.result);
      body.result.result.map(customer => {
        getPartner(visa,customer.Id);
      })
     
    }) 
  }
  const getPartner = (visa,id) => {

    const options = {
      url:"https://api.backup.management/jsonapi",
      method:"POST",
      jsonrpc:"2.0",
      headers:headers,
      port:443,
      json: {
        "jsonrpc":"2.0",
        "visa":visa,
        "id":"jsonrpc",
        "method":"GetPartnerInfoById",
        "params":{
          "partnerId":id,
        },
      }
    }
    request(options,function(err,res,body){
      if (err) { return reject(error); }

      var obj = JSON.stringify(body);
      let arr = []
      var obj2 = JSON.parse(obj);
      let id; 
      for ( i in obj2){
        arr.push(obj2[i])
      } 
   
     // var obj3 = JSON.stringify(arr[2]);
      //console.log(arr[2].result.Name );

      
      if(arr[2].result.Name === "OfekCloud"){
        console.log(arr[2].result);

        const customerObject = {
          Name : arr[2].result.Name,
          Id: arr[2].result.Id,
          ParentId: arr[2].result.ParentId,
          Uid: arr[2].result.Uid
        }
        console.log("Success");
      
        getListOfDevices(visa,customerObject.ParentId);
       
      }
     
    //  let arr2 = [];
     // for (i in obj3){
    //    arr2.push(i)
     // }
     // console.log(arr2);
    //console.log(id);
      //const finalPartner = getFinalPartner(body.result);
      //console.log(finalPartner);
    })   
  }

  const getListOfDevices = (visa,partnerId) => {
    const options = {
      url:"https://api.backup.management/jsonapi",
      method:"POST",
      jsonrpc:"2.0",
      headers:headers,
      port:443,
      json: {
        "jsonrpc":"2.0",
        "visa":visa,
        "id":"jsonrpc",
        "method":"EnumerateAccounts",
        "params":{
          "partnerId":partnerId,
        },
      }
    }
    request(options,function(err,res,body){
      if(err){console.log(err);}
      const result = body.result;
      console.log("THIS IS RESULT: ");
      console.log(result.result);
    
    })
     
  }
  const getFinalPartner = (arr) => {
    
    if(arr.result.Name === "OfekCloud"){
      return arr[2].result.Id;
    }
  }
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
