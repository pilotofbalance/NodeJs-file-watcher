const http = require('http');
const utils = require('./utils/utils');
const config = require('../config.json');

const server = http.createServer((req, resp)=>{ 
  //console.log(req);
  const route = utils.routing(req,resp);
  route.match.controller(req,resp,route);
});
server.listen(config.port);