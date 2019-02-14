import React, { Component } from 'react';
import Monitor from './monitor';
import PropTypes from 'prop-types';
import service from './services/service';
import Head from './components/head';
import Alert from './components/alert';

class LoginPage extends Component{
	constructor(props) {
		super(props);
		this.state = {alert:'', pswVal:true, usrVal:true, password:'', username:''};
		this.textInput = React.createRef();
		this.handleChange = this.handleChange.bind(this);
		this.login = this.login.bind(this);
		this.isFormValid = this.isFormValid.bind(this);
	}
    
    //update state with event value
    handleChange(e) {
    	this.setState({ [e.target.name]: e.target.value });
    }

    //request for token
	login(e){
		e.preventDefault();
		if(this.isFormValid()){
			const success = (resp,scope) => {
               document.cookie = `_auth_cookie=${resp.data.data}`;
	           scope.props.switchView(Monitor);
	        }
	        const failure = (error,scope) => {
	           scope.setState({alert:error.response.data.msg});
	        }
			service.doAction('/login',"POST",this.state,this,success,failure);
		}
	}

    //some basic form validation
	isFormValid(){
		let pswVal = true;
		let usrVal = true;
		if(this.state.password === ''){
			pswVal = false;
		}
		if(this.state.username === ''){
			usrVal = false;
		}
		this.setState({pswVal:pswVal, usrVal:usrVal});
		return pswVal && usrVal;
	}

    //set focus to first input field on page load
	componentDidMount() {
    	this.textInput.current.focus();
    }
	
	render(){
		let alert;
		if(this.state.alert !== ""){
			alert = <Alert alert={this.state.alert} alertClass={'container alert-error'} onComplete={{scope:this}}/>;
		}
		return (
			<div>
				<form>
				    <Head title={'Login Form'}/>
					<div className="container">
					    <label htmlFor="uname"><b>Username</b></label>
					    <input placeholder="Enter Username" onChange={(e)=>{this.handleChange(e);this.isFormValid()}} value={this.state.username} className={!this.state.usrVal?'notValid':''} id="uname" name="username" type="text" ref={this.textInput}/>

					    <label htmlFor="psw"><b>Password</b></label>
					    <input placeholder="Enter Password" onChange={(e)=>{this.handleChange(e);this.isFormValid()}}  value={this.state.password} className={!this.state.pswVal?'notValid':''} id="psw" name="password" type="password" />
					        
					    <button className="primary" type="submit" id="submit" onClick={this.login}>Login</button>
				    </div>
				    {alert}
				</form>
			</div>
			);
		}
}
export default LoginPage;

LoginPage.propTypes = {
    switchView: PropTypes.func.isRequired
};