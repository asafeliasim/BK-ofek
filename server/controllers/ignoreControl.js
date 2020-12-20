
const connection = require('../config/db');

// @desc   Get Ignores
// @route  GET /api/ignores
// @access Public


const getSWFILESIgnores =  (mysqlDB) => {
        mysqlDB.query('SELECT * FROM SWFiles',function(error, results, fields) {
            if (error) throw error;
            return results;
          });
}

module.exports = {
    getSWFILESIgnores
}