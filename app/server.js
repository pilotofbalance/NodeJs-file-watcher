const http = require('http');
const utils = require('./utils/utils');

const server = http.createServer((req, resp)=>{ 
  const route = utils.routing(req,resp);
  route.match.controller(req,resp,route);
});
server.listen(8090);