const utils = require('../utils/utils');
const token = require('../utils/token');
const fs = require('fs');
const watcher = require('../utils/watcher');

//check if requested directory exists in file system, is so initiate file observer
const handler = (req, resp) => {
   utils.collectData(req, (data) => {
   	let respMsg = 'Service started successfully';
   	let status = 200;
   	checkDirectory(data.folder, (err)=>{
   		if (err) {
        	respMsg = `No such directory, stat ${data.folder}`;
    	    status = 404;
    	}else{
    		//initiate watcher
    		watcher.init(fs, data.folder);
    	}
    	utils.sendResponse(resp, respMsg, status);
   	})
   });
}

const checkDirectory = (directory,callback) => {  
  fs.stat(directory, (err, stats) => {
    callback(err);
  });
}

module.exports = handler;