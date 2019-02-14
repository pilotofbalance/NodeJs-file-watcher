const http = require('http');
const utils = require('./utils/utils');
const config = require('../config.json');
const static = require('./utils/static');

//initiate web server
const server = http.createServer((req, resp)=>{ 
  const isStatic = static.revise(req,resp);
  const route = utils.routing(req,resp,isStatic);
  if(route.match){
    route.match.controller(req,resp,route);
  }
});
server.listen(config.port);