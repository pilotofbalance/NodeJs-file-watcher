const config = require('../../config.json');
const utils = require('../utils/utils');
const token = require('../utils/token');

const handler = (req, resp) => {
   utils.collectData(req, (data) => {
   	if(data && data.password === config.password && data.username === config.username){
   		utils.sendResponse(resp, {user:data.username,token:token.init()}, 200, {'Content-Type': 'application/json'});
   	}else{
        utils.sendResponse(resp, "Unauthorized client", 401);
   	}
   });
}

module.exports = handler;
