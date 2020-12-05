import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';

import { authActions } from '~/state/ducks/authUser';
import { LOGIN_PATH, RECOVERY_CHANGE_PASSWORD_PATH, REGISTER_OTP_PATH, RECOVERY_OTP_PATH, REGISTER_COMPLETED_PATH } from '~/configs/routesConfig';
import { showError } from '~/configs/ServerErrors';
import { message } from 'antd';
import strings from '~/localization';
const queryString = require('query-string');


export default compose(
	withRouter,
	connect(
		(state)=>({
				registerInfo: state['authUser'].registerInfo
		}),
		{
			login: authActions.login,
			activeAccount: authActions.activeAccount,
			validateResetPasswordOTP: authActions.validateResetPasswordOTP
		}
	),
	withState('OTP','setOTP', ''),
	withFormik({
		displayName: 'loginForm',
		handleSubmit: async (values, { props, setSubmitting }) => {
			const { OTP, history, validateResetPasswordOTP, activeAccount } = props;
			let params = queryString.parse(props.location.search)
			switch(props.match.path){
				// activate account
				case REGISTER_OTP_PATH:{
					activeAccount(params.key, OTP)
					.then(res=>{
						setSubmitting(false)
						message.success(strings.activation_successful)
						history.push(REGISTER_COMPLETED_PATH)
					})
					.catch(err=> {
						setSubmitting(false)
						showError(err)
					})
				}break
				// recovery account
				case RECOVERY_OTP_PATH:{
					validateResetPasswordOTP({
						resetKey: params.key,
						otp: OTP
					})
					.then(res=>{
						history.push(RECOVERY_CHANGE_PASSWORD_PATH)
					})
					.catch(err=>{
						setSubmitting(false)
						showError(err)
					})
				}break
				default: break;

			}
		
			
		}
	})
);
