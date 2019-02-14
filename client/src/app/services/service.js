import axios from 'axios';

const services = {
	doAction: (url, method, data, scope, success, failure)=>{
		const header =  {'Content-Type': 'application/json'};
        const token = services.getCookie();
        axios.defaults.headers.common['Authorization'] = `${token}`;
		return axios[method.toLowerCase()](url, data, header).then((resp)=>success(resp,scope)).catch((error)=>failure(error,scope));
	},
	getCookie: ()=>{
		return document.cookie.replace(/(?:(?:^|.*;\s*)_auth_cookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	}
}

export default services;