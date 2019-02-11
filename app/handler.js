const utils = require('./utils');

const handler = (req, resp) => {
  const method = methods[req.method];
  if (method) {
  	 method(req,resp);
  } else {
     utils.sendResponse(resp, "No such method found", 404);
  }
}

const methods = {
	'GET' : (req, resp) => {utils.sendResponse(resp, 'Hello, World!', 200, {'Content-Type': 'text/plain'});},
	'POST': (req, resp) => {utils.collectData(req, (data) => {
  		utils.sendResponse(resp, 'Success '+data, 200, {'Content-Type': 'text/plain'});
  	});}
}

module.exports = handler;