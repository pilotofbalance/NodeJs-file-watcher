const fs = require('fs');
const assert = require('assert');
const watcher = require('../utils/watcher');
const {promisify} = require('util');
const util = require('./util');
const server = require('../server');
const config = require('../../config.json');
var pathLib = require('path');

const writeFile = promisify(fs.writeFile);
const unlinkFile = promisify(fs.unlink);
const renameFile = promisify(fs.rename);
const path = pathLib.normalize(config.testsPath);

async function test(){
	//initialize fs.watch file observer
	watcher.init(fs, path);
	//add file and check that specified event fired
	await writeFile(`${path}/add_file.txt`, 'Test File').then(() =>{}).catch(e => console.log(e));
	await util.prom(watcher.events).then((res)=>{
		//console.log(res);
		util.describe('Test file add event', () => {
		  util.it('should catch adding file event', () => {
		    util.expect(res[0].event).toEqual('(ADD) FILE add_file.txt HAS BEEN ADDED');
		  });
		});
	});

    //rename file and check event
    await renameFile(`${path}/add_file.txt`, 'C:/MyFiles/rename_file.txt').then(()=>{}).catch(e => console.log(e));
	await util.prom(watcher.events).then((res)=>{
		//console.log(res);
		util.describe('Test file rename event', () => {
		  util.it('should catch renaming file event', () => {
		    util.expect(res[0].event).toEqual('(RENAME) FILE add_file.txt HAS BEEN RENAMED TO rename_file.txt');
		  });
		});
	});

    //remove file and check event
	await unlinkFile(`${path}/rename_file.txt`).then(() =>{}).catch(e => console.log(e));
	await util.prom(watcher.events).then((res)=>{
		//console.log(res);
		util.describe('Test file remove event', () => {
		  util.it('should catch removing file event', () => {
		    util.expect(res[0].event).toEqual('(REMOVE) FILE rename_file.txt HAS BEEN REMOVED');
		  });
		});
	});
 
    //stop file observer
	await util.prom(watcher.stop);
    let token;
    //testnig login service
	await util.request('/login','POST',{password:config.password,username:config.username}).then((result)=>{
		util.describe('Test /login service', () => {
		  util.it('should return token and success message', () => {
		    util.expect(result.data).toBeTruthy();
		    util.expect(result.msg).toEqual('Successfully logged in');
		    token = result.data;
		  });
		});
	});

    //testing /start service
	await util.request('/start','POST',{folder:path},token).then((result)=>{
		util.describe('Test /start service', () => {
		  util.it('should start folder event observation', () => {
		    util.expect(result.msg).toEqual('Service started successfully');
		  });
		});
	});

    //testing /status/{event} service
	await util.request('/status/all','GET',{},token).then((result)=>{
		util.describe('Test /status service', () => {
		  util.it('should return observed events', () => {
		    util.expect(result.data).toHaveLength(0);
		  });
		});
	});

	//testing /logout service
	await util.request('/logout','POST',{},token).then((result)=>{
		util.describe('Test /logout service', () => {
		  util.it('should return observed events', () => {
		    util.expect(result.msg).toEqual('Successfuly logged out');
		  });
		});
	});

    //testing not existing service
	await util.request('/make/israel/great/again','PUT',{},token).then((result)=>{
		util.describe('Test not existing service', () => {
		  util.it('should return message that service not found and invoc status 404', () => {
		    util.expect(result.msg).toEqual('No such service found');
		    util.expect(result.code).toEqual(404);
		  });
		});
	});

	//testing not existing service
	await util.request('/status/all','GET',{},null).then((result)=>{
		util.describe('Test existing service without token', () => {
		  util.it('should return message that token expired and invoc status 401', () => {
		    util.expect(result.msg).toEqual('The access token provided is expired');
		    util.expect(result.code).toEqual(401);
		  });
		});
	});

	//testnig wrong login service
	await util.request('/login','POST',{password:'asad',username:'dsa'}).then((result)=>{
		util.describe('Test /login service with wrong creditals', () => {
		  util.it('should return unauthorized message and invoc status 401', () => {
		    util.expect(result.msg).toEqual('Unauthorized client');
		    util.expect(result.code).toEqual(401);
		  });
		});
	});
	await util.prom(process.exit);

}

test();