
  const request = require('request');
  const {headers,authOptions} = require('./options');
   

 const swAuth = new Promise(function(resolove,reject){
    request(authOptions,function(err,res,body){
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
const enumerateAccountStatistics = (visa,partnerId,backupType) => {
    const enoptions = {
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
  
    request(enoptions,function(error,res,body){

      if (error){
        console.log(error);
      }
   /*   body.map(i => {
        console.log(i.Settings);
      }) */
      console.log("************* body *******************");
     
      console.log(enoptions.json.params);
      body.result.result.map(item=>{
        console.log(item.Settings);
      })
      console.log("************* body ********************");
    
    
    })
}

const getListOfDevices = (visa,partnerId) => {
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
  request(options,function(err,res,body){
    if(err){console.log(err);}
    const result = body.result;



    enumerateAccountStatistics(visa,partnerId,"D01F00");
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
     

    })   
  }
  module.exports = {
    swAuth,
    getPartnerIds
  }