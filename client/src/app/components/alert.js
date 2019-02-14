import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Alert extends Component{

	componentDidMount(){
		setTimeout(()=>this.props.onComplete.scope.setState({alert:''}),3000);
	}

	render(){
		return (
			<div className={this.props.alertClass}>{this.props.alert}</div>
			);
		}
}
export default Alert;

Alert.propTypes = {
    alertClass: PropTypes.string,
    alert: PropTypes.string,
    onComplete: PropTypes.object.isRequired
};