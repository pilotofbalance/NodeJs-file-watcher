const config = require('../../config.json');
const watcher = require('./watcher');

let token;
let interval;

//generate randon string
const rand = ()=> {
    return Math.random().toString(36).substr(2); 
};

//set timeout callback
const expired = ()=> {
	interval = setInterval(set,config.expTime);
}

//reset token and stop watcher
const set = ()=>{
	token = null;
	watcher.stop();
}

exports.verify =(val)=>{
	return val === token;
}

exports.get = ()=>{
	return token;
}

//initialize token and clean previous 
exports.init = ()=> {
    clearInterval(interval);
    token = rand() + rand(); 
    expired();
    return token;
};

exports.set = set;

