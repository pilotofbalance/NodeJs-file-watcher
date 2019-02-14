import React, { Component } from 'react';
import Login from './login';

class MainPage extends Component{
	constructor(props) {
		super(props);
		this.state = {route: Login};
		this.switchView = this.switchView.bind(this);
	}
	
	switchView(view){
        this.setState({route:view});
	}

	render(){
		const Route = this.state.route;
		return (
			<div>
				<Route switchView={this.switchView}/>
			</div>
			);
		}
}
export default MainPage;
