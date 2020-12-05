import isomorphicFetch from 'isomorphic-fetch';
import authHeader from './authHeader';
import { API_CODE } from '~/configs';
import ServerErrors from '~/configs/ServerErrors';
import store from '../store';
import { authActions } from "~/state/ducks/authUser";
import { getString } from '~/views/utilities/helpers/utilObject';

export const requestHeaders = withToken => {
	let header = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	};
	if (withToken) {
		header = {
			...header,
			...authHeader()
		};
	}
	return header;
};

const fetch = (url, method, body, withToken, ctx) => {
	let options = {
		method: method ? method : 'get',
		headers: requestHeaders(withToken, ctx)
	};

	//Fix for Edge cannot have body in options
	if (method !== 'get') {
		options = {
			...options,
			body: JSON.stringify(body)
		};
	}
	return isomorphicFetch(url, options).then(res => {
		let httpStatus = res.status
		let resHeaders = {}
		try {
			res.headers.forEach((value, name) => {
					resHeaders[name] = value
			});
		} catch (error) {}

		return new Promise( async (resolve, reject)=>{
			if(httpStatus === 204){
					resolve({res: { message : API_CODE.SUCCESS }, header: resHeaders})
			}
			else if(httpStatus >= 200 && httpStatus <= 299){
				  try {
						let json = await res.json()
						resolve({res: json, header: resHeaders})
					} catch (error) {	}
			}
			else if(httpStatus === 400){
					try {
						let json = await res.json()
						reject(ServerErrors.getServerError(json))
					} catch (error) {}
			}
			else if(httpStatus === 401 || httpStatus === 403){
				try {
					let json = await res.json()
					let message = getString(json,'message')
					if(message === 'user.login.invalid' || message === 'user.not.activated'){
						 reject(ServerErrors.getServerError(json))
						 return
					}
					else if(message === 'user.blocked'){
						reject(ServerErrors.getServerError(json))
						store.dispatch(authActions.logout())
						return
					}
				} catch (error) {}
				
				reject(ServerErrors.getServerError({message: 'TOKEN_EXPIRED'}))
				store.dispatch(authActions.logout())
				
			}
			else {
					reject(ServerErrors.getServerError({message: 'maintenance'}))
			}
		})
	})
};

export default fetch;



