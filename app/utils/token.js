const config = require('../../config.json');

let token;
let interval;

const rand = ()=> {
    return Math.random().toString(36).substr(2); 
};

const expired = ()=> {
	interval = setInterval(set,config.expTime);
}

const set = ()=>{
	token = null;
}

exports.verify =(val)=>{
	return val === token;
}

exports.get = ()=>{
	return token;
}

exports.init = ()=> {
    clearInterval(interval);
    token = rand() + rand(); 
    expired();
    return token;
};


