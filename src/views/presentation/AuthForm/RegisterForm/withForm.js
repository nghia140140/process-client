import { compose } from 'recompose';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import {stringRequiredField, passwordConfirmationValidate, passwordValidate, emailValidate , } from '~/views/utilities/validation/input'
import { authActions } from '~/state/ducks/authUser';
import { REGISTER_OTP_PATH } from '~/configs/routesConfig';
import { showError } from '~/configs/ServerErrors';
import { message } from 'antd';
import strings from '../../../../localization';
import { getString } from '~/views/utilities/helpers/utilObject';

const validationSchema = yup.object().shape({
	fullname: stringRequiredField(strings.require_fullname,50),
	username: stringRequiredField(strings.require_username,50),
	email: emailValidate,
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
			email: "",
			password: '',
			reenterPasword: '',
			role: "",
			description: undefined,
			termAgree: false
		}),
		handleSubmit: async (values, { props, setSubmitting }) => {
			const { register, history } = props;

			let body = {
				"name": values.fullname,
				"username": values.username,
				"email": values.email,
				"role": values.role,
				"password": values.password
			}
			console.log("Role");
			console.log(values.role);
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
