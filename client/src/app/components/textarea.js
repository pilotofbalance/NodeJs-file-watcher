import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextArea extends Component{
	
	constructor(props) {
		super(props);
		this.textLog = React.createRef();
		this.state = {logs:''};
	}
    
    //convert log array to text and concat to previous state text
    static getDerivedStateFromProps(nextProps, prevState) {
    	let text = '';
	    if(nextProps.log.length){
			nextProps.log.forEach((log)=>{text = TextArea.textFormat(text,`${log.date} - ${log.event}`)});
			return {logs:TextArea.textFormat(prevState.logs,text)};
	    }
	    if(nextProps.action === 'hidden'){
	    	return {logs:''};
	    }
    	return null;
    }

	//get rid of empty lines from textarea
	static textFormat(text,log){
		return text === '' ? log : `${text}\n${log}`;
	}
    
    //scroll textarea down after state update
    shouldComponentUpdate(){
    	this.textLog.current.scrollTop = this.textLog.current.scrollHeight;
    	return true;
    }

	render(){
		return (
			<div className="container">
				<textarea rows="20" value={this.state.logs} ref={this.textLog}></textarea>
		    </div>
			);
		}
}
export default TextArea;

TextArea.propTypes = {
    log: PropTypes.array
};