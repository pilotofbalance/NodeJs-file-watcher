import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Alert extends Component{
	
	render(){
		return (
			<div className={this.props.alertClass}>{this.props.alert}</div>
			);
		}
}
export default Alert;

Alert.propTypes = {
    alertClass: PropTypes.string,
    alert:PropTypes.string
};