const express = require('express');
const cors = require('cors');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv');
const mysql = require('mysql');
const moment = require('moment');

var rp = require('request-promise');
const {swAuth,getPartnerIds,getListOfDevices,enumerateAccountStatistics} = require('./swFunctions/utils');
dotenv.config();

const axios = require('axios');
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
  
  app.post('/api/insert/:type',(req,res)=>{
    console.log("this is type: " + req.params.type);
    console.log("this is body: " + req.body);
    let date =  new Date(Date.now());
  

    const sql = `INSERT INTO PRTG.${req.params.type} (name,time,user) VALUES ('${req.body}',NOW(), 'asaf@ofek.com');`

      mysqlDB.query(sql,function(error,result){
        if (error) throw error;
        res.status(200).json({
          msg: 'Data send to DB'
        })

      })
         
  })


  app.post('/api/swbackup/:type',async(req,res)=>{
      const {type} = req.params;

      swAuth.then(data=>{
        const{visa,partnerID} = data;
      
        getPartnerIds(visa,partnerID,type).then(data=>{   
           console.log(data);    
           getListOfDevices(visa,data,type).then(data=>{
             console.log("data: " + data);
            enumerateAccountStatistics(visa,data,type).then((data)=>{
              const stringData = JSON.stringify(data);
              const objData = JSON.parse(stringData)
              res.json({
                "data": stringData
              })
             

            })
           }).catch(error=>{
             console.error(error);
           })
        }).catch(error=>{
          console.error(error);
        });
       
      }).catch(e=>{
        console.error(e);
      });
  })
  app.listen(port,()=>{
    console.log(`Server is on in ${port}`.green);
  })
