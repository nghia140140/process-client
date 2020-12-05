import { compose } from 'recompose';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';

import { authActions } from '~/state/ducks/authUser';
import { LOGIN_PATH, APP_DEFAULT_PATH } from '~/configs/routesConfig';
import { showError } from '~/configs/ServerErrors';
import { passwordValidate, passwordConfirmationValidate } from '~/views/utilities/validation/input';
import { message } from 'antd';
import strings from '~/localization';

const validationSchema = yup.object().shape({
	password: passwordValidate,
	reenterPassword: passwordConfirmationValidate
});

export default compose(
	withRouter,
	connect(
		(state)=>({
			resetKey: state['authUser'].resetKey
		}),
		{
			resetPasswordFinish: authActions.resetPasswordFinish,
		}
	),
	withFormik({
		displayName: 'loginForm',
		validationSchema: validationSchema,
		mapPropsToValues:props=>({
			password: '',
			reenterPassword: ''
		}),
		handleSubmit: async (values, { props, setSubmitting }) => {
			const { resetPasswordFinish, history, match, getUser, resetKey } = props;
			resetPasswordFinish({
				"resetKey": resetKey,
				'newPassword': values.password
			})
			.then(res=>{
				message.success(strings.reset_password_successful)
				history.push(LOGIN_PATH)
			})
			.catch(err=>{
				setSubmitting(false)
				showError(err)
			})
			
		}
	})
);
