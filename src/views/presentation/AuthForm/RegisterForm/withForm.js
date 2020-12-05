import { compose } from 'recompose';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import {stringRequiredField, passwordConfirmationValidate, passwordValidate, phoneOrEmailValidate , } from '~/views/utilities/validation/input'
import { authActions } from '~/state/ducks/authUser';
import { REGISTER_OTP_PATH } from '~/configs/routesConfig';
import { showError } from '~/configs/ServerErrors';
import { message } from 'antd';
import strings from '../../../../localization';
import { getString } from '~/views/utilities/helpers/utilObject';

const validationSchema = yup.object().shape({
	firstName: stringRequiredField(strings.require_firstName,50),
	lastName: stringRequiredField(strings.require_lastName,50),
	login: phoneOrEmailValidate,
	password: passwordValidate,
	reenterPasword: passwordConfirmationValidate
});

export default compose(
	withRouter,
	connect(
		null,
		{
			register: authActions.register,
		}
	),
	withFormik({
		displayName: 'loginForm',
		validationSchema: validationSchema,
		mapPropsToValues: props =>({
			firstName: "",
			lastName: "",
			login: "",
			password: '',
			reenterPasword: '',
			description: undefined,
			termAgree: false
		}),
		handleSubmit: async (values, { props, setSubmitting }) => {
			const { register, history } = props;

			let body = {
				"login": values.login,
				"password": values.password,
				"firstName": values.firstName,
				"lastName": values.lastName
			}
		
			register(body)
			.then(res=>{
				setSubmitting(false)
				message.success(strings.sent_OTP)
				history.push(REGISTER_OTP_PATH.replace(':account', getString(res,'res.login','') + `?key=${getString(res,'res.activationKey','')}`))
			})
			.catch(err=>{
				setSubmitting(false)
				showError(err)
			})
			
		}
	})
);
