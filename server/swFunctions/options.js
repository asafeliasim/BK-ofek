
   const headers = {
    'Content-Type':'applicaton/json'
  }

  const authOptions = {
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
  }

  module.exports = {
      headers,
      authOptions,
   
  }