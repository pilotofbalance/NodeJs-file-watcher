import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Head extends Component{
	
	render(){
		return (
			<div className="container head">
				<h1>{this.props.title}</h1>
		    </div>
			);
		}
}
export default Head;

Head.propTypes = {
    title: PropTypes.string
};