import React, { Component } from 'react';
import Login from './login';
import Spinner from './components/spinner';
import Head from './components/head';
import TextArea from './components/textarea';
import Alert from './components/alert';
import PropTypes from 'prop-types';
import service from './services/service';

class MonitorPage extends Component{
	constructor(props) {
		super(props);
		this.state = {action:'hidden',alert:'',alertClass:'container',folder:'',log:'',folVal:false,status:''};
		this.textLog = React.createRef();
		this.handleChange = this.handleChange.bind(this);
		this.start = this.start.bind(this);
		this.status = this.status.bind(this);
		this.stop = this.stop.bind(this);
		this.logout = this.logout.bind(this);
	}
	
	handleChange(e) {
    	this.setState({ [e.target.name]: e.target.value });
    }
    
    //call to '/start' service and handle errors
    start(){
    	if(this.isFormValid()){
    		const success = (resp,scope) => {
    	       //call to '/status/{event}' service recursivly till firing '/stop/ service'
    		   const status = setInterval(()=>this.status(),1000);
               scope.setState({action:'visible',alert:resp.data.msg,alertClass:'container alert-success',status:status});
	    	}
	    	const failure = (error, scope) => {
	    	   //handle non existing path error
	    	   if(error.response.status === 404){
	    	   	    const msg = error.response.data.msg;
	    	   		scope.setState({alert:msg,alertClass:'container alert-error'});
	    	   }else{
	                this.sessionExpired();
	    	   }
	    	}
			service.doAction('/start','POST',this.state,this,success,failure);
    	}
	}

    //call to '/status/{event}' service and update log
	status(){
		const success = (resp,scope) => {
			   let text = '';
			   const res = resp.data
			   if(res && res.data && res.data.length){
			       res.data.forEach((log)=>{text = this.textFormat(text,`${log.date} - ${log.event}`)});
			       scope.setState((prevState)=>({log:this.textFormat(prevState.log,text)}));
			       this.textLog.current.scrollTop = this.textLog.current.scrollHeight;
			   }
               
	    }
	    const failure = (error) => {
	           this.sessionExpired();
	    }
		service.doAction('/status/all','GET',{},this,success,failure);
	}

    //call to '/stop' service and kill recursive call to 'status/{event}' service
	stop(){
		const success = (resp,scope) => {
			   clearInterval(this.state.status);
               scope.setState({log:'',status:'',action:'hidden',alert:resp.data.msg,alertClass:'container alert-success'});
	    }
	    const failure = (error) => {
	           this.sessionExpired();
	    }
		service.doAction('/stop','POST',{},this,success,failure);
	}

    //call to '/logout' service and erase token from cookies
	logout(){
		const success = (resp,scope) => {
               document.cookie = `_auth_cookie=${undefined}`;
	           scope.props.switchView(Login);
	    }
	    const failure = (error) => {
	           console.log(error);
	    }
		service.doAction('/logout','POST',{},this,success,failure);
	}

    //handle token expiration error
	sessionExpired(){
		alert("Your session has been expired please log in again.");
	    window.location.href ='/';
	}
    
    //some basic form validation
    isFormValid(){
		let folVal = true;
		if(this.state.folder === ''){
			folVal = false;
		}
		this.setState({folVal:folVal});
		return folVal;
	}
    
    //get rid of empty lines from textarea
	textFormat(text,log){
		return text === '' ? log : `${text}\n${log}`;
	}

	render(){
		let alert;
		if(this.state.alert !== ''){
			alert = <Alert alert={this.state.alert} alertClass={this.state.alertClass} onComplete={{scope:this}}/>;
		}
		const hidden = this.state.action === 'hidden' ? true : false;
		return (
			<div>
				<form>
				    <Head title={'Folder Monitor Form'}/>
					<div className="container">
					    <Spinner action={this.state.action}/>
					    <label htmlFor="folder"><b>Select Folder</b></label>
					    <input id="folder" name="folder" type="text" placeholder="Example C:/someFolder/etc" onChange={(e)=>{this.handleChange(e);this.isFormValid()}} value={this.state.folder} className={!this.state.folVal?'notValid':''}/>
					    <button type="button" id="start" onClick={this.start} className="success" disabled={!hidden}>Start</button>
					    <button type="button" id="stop" onClick={this.stop} className="danger" disabled={hidden}>Stop</button>
					    <button type="button" id="logout" onClick={this.logout} className="primary right">Logout</button>
				    </div>
				    {alert}
				    <TextArea log={this.state.log} refr={this.textLog}/>
				</form>
			</div>
			);
		}
}
export default MonitorPage;

MonitorPage.propTypes = {
    switchView: PropTypes.func.isRequired
};