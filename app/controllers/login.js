const config = require('../../config.json');
const utils = require('../utils/utils');
const token = require('../utils/token');

//validate user auntification and respond with generated token
const handler = (req, resp) => {
   utils.collectData(req, (data) => {
   	if(data && data.password === config.password && data.username === config.username){
   		utils.sendResponse(resp, 'Successfully logged in',200,token.init());
   	}else{
        utils.sendResponse(resp, 'Unauthorized client', 401);
   	}
   });
}

module.exports = handler;