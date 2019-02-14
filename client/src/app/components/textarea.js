import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextArea extends Component{
	
	render(){
		return (
			<div className="container">
				<textarea rows="20" value={this.props.log} ref={this.props.refr}></textarea>
		    </div>
			);
		}
}
export default TextArea;

TextArea.propTypes = {
    log: PropTypes.string,
    refr: PropTypes.instanceOf(Element)
};