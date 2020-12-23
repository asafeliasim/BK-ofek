
const  axios = require('axios').default;
const request = require('request');
const {headers,authOptions} = require('./options');
const fetch = require('node-fetch');

 const swAuth = new Promise(function(resolove,reject){
    request(authOptions,function(err,res,body){
      if (err) { return reject(error); }
  
      return resolove({
        visa: body.visa,
        partnerID:body.result.result.PartnerId
      })
    });
  });
  const getPartnerIds = function (visa,partnerID,type){
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
    return new Promise(function(resolve,reject){
    
      request(options,function(err,res,body){
        if (err) { return reject(error); }
      
        //console.log(body.result.result);
        //console.log(body.result.result);
        body.result.result.map(customer => {
          const partnerOptions = {
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
                "partnerId":customer.Id,
              },
            }
          }
          console.log(customer.Id);
          request(partnerOptions,function(err,res,body){
            if (err) { return reject(err); }
        
            var obj = JSON.stringify(body);
            let arr = []
            var obj2 = JSON.parse(obj);
           
            for ( i in obj2){
              arr.push(obj2[i])
            } 
        
          
            if(arr[2].result.Name === "OfekCloud"){
              
              const customerObject = {
                Name : arr[2].result.Name,
                Id: arr[2].result.Id,
                ParentId: arr[2].result.ParentId,
                Uid: arr[2].result.Uid
              }
              console.log("customer: " + customerObject.Id);
         
              //return resolve(customerObject.ParentId)
              //return resolve(customerObject.ParentId);
              return resolve(customerObject.Id)
             // return resolve(getListOfDevices(visa,customerObject.ParentId,type));
             
            }
           
      
          })   
          //return resolve(customer.Id);
         //return resolve(getPartner(visa,customer.Id,type));
         //resolve(getPartner(visa,customer.Id,type));

        })
       
      }) 
    })
  }
 
const enumerateAccountStatistics = (visa,partnerId,backupType) => {
    console.log("partnerId: " + partnerId);
    const options = {
      url:"https://api.backup.management/jsonapi",
      method:"POST",
     
      headers:headers,
      json:{
         "visa": visa,
         "id": "jsonrpc",
         "jsonrpc":"2.0",
         "method":"EnumerateAccountStatistics",
         "params":{
           "query":{
             "PartnerId":partnerId,
             "SelectionMode":"Merged",
             "StartRecordNumber":0,
             "RecordsCount":500,
             "Columns": ["I1",backupType],
             "Totals":["SUM(I14)"]   
           }
         }
      }
    }

    return new Promise(function(resolve,reject){
      console.log(options.json.params);
      request(options, function(error,res,body){
        if (error){
          return reject(error)
        }
       
        let objArray = []
        body.result.result.map(item=>{
          console.log("*************** item ******************");   
          console.log(item.Settings);
          console.log("****************************************");   
          
          let type = item.Settings[0] && item.Settings[0][`${backupType}`]  ? item.Settings[0][`${backupType}`] : ""
          let cli = item.Settings[1] ? item.Settings[1].I1 : ""
          type = type === '1' ? 'InProgress' : type === '2' ? 'Failed' : type === '3' ? 'Aborted' : type === '5' ? 'Completed' : type === '6' ? 'Interrupted' : 
          type === '7' ? 'NotStrated' : type === '8' ? 'CompletedWithErrors' : type === '9' ? 'InProgressWithFaults' : type === '10' ? 'OverQuota' : 
          type === '11' ? 'NoSelection' : 'Restarted'

          objArray.push({
            type,
            cli
          })
         
        })
        
        let data = {
         "data":objArray 
        }
        console.log(objArray);
        return resolve(data.data)
        //return resolve(axios.post('http://localhost:4000/api/swbackup/data',data,config))
     
      })
    })
 
}

const getListOfDevices = (visa,partnerId,type) => {
  
  const options = {
    url:"https://api.backup.management/jsonapi",
    method:"POST",
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
  return new Promise(function(resolve,reject){
    request(options,function(err,res,body){
      if(err){reject(error)}
      
      return resolve(partnerId);
  })

   
  })
   
}

 const getPartner = (visa,id,type) => {

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
    return new Promise(function(resolve,reject){
      request(options,function(err,res,body){
        if (err) { return reject(error); }
    
        var obj = JSON.stringify(body);
        let arr = []
        var obj2 = JSON.parse(obj);
       
        for ( i in obj2){
          arr.push(obj2[i])
        } 
    
      
        if(arr[2].result.Name === "OfekCloud"){
          
          const customerObject = {
            Name : arr[2].result.Name,
            Id: arr[2].result.Id,
            ParentId: arr[2].result.ParentId,
            Uid: arr[2].result.Uid
          }
          console.log("customer: " + customerObject.ParentId);
     
          //return resolve(customerObject.ParentId)
          //return resolve(customerObject.ParentId);
          return resolve(customerObject.ParentId)
         // return resolve(getListOfDevices(visa,customerObject.ParentId,type));
         
        }
       
  
      })   
    })
   
  }
  module.exports = {
    swAuth,
    getPartnerIds,
    getPartner,
    getListOfDevices,
    enumerateAccountStatistics
  }