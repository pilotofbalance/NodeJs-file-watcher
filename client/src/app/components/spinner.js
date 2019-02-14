import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Spinner extends Component{
	
	render(){
		return (
			<div className="spinner left" style={{'visibility':this.props.action}}>
			    <span className="spinner-span"></span>
			</div>
			);
		}
}
export default Spinner;

Spinner.propTypes = {
    action: PropTypes.string
};