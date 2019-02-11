const utils = require('../utils/utils');
const token = require('../utils/token');

const handler = (req, resp) => {
   utils.collectData(req, (data) => {
   	 token.set(null);
   	 utils.sendResponse(resp, {msg:'user logged out',token:token.get()}, 200, {'Content-Type': 'application/json'});
     
   });
}

module.exports = handler;