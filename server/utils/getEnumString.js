const errorType = require('./errorEnum');

const getEnumString = (type) => {
    switch(type){
        case "SWFiles":
            return errorType.SWFiles;
        case "SWHyperV":
            return errorType.SWHyperV;
        case "SWLBT":
            return errorType.SWLBT;
        case "SWLinuxSysState":
            return errorType.SWLinuxSysState;  
        case "SWMS365SharePoint":
            return errorType.SWMS365SharePoint;      
        case "SWMSExch365":
            return errorType.SWMSExch365; 
        case "SWMSOneDrive365":
            return errorType.SWMSOneDrive365; 
        case "SWMSSQL":
            return errorType.SWMSSQL; 
        case "SWMYSQL":
            return errorType.SWMYSQL; 
        case "SWNetworkShares":
            return errorType.SWNetworkShares; 
        case "SWOracle":
            return errorType.SWOracle; 
        case "SWSysState":
            return errorType.SWSysState; 
        case "SWVSSExchange":
            return errorType.SWVSSExchange; 
        case "SWVSSMSSQL":
            return errorType.SWVSSMSSQL; 
        case "SWVSSSharePoint":
            return errorType.SWVSSSharePoint;
        case "SEVSSSysState":
            return errorType.SEVSSSysState;    
        default:
            return "";
    }

}

module.exports = {getEnumString};