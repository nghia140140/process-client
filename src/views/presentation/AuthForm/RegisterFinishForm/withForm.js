import { compose } from 'recompose';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';

import { authActions } from '~/state/ducks/authUser';
import { LOGIN_PATH, APP_DEFAULT_PATH, RECOVERY_OTP_PATH } from '~/configs/routesConfig';
import { showError } from '~/configs/ServerErrors';

// const validationSchema = yup.object().shape({
// 	email: emailValidate,
// 	password: passwordValidate
// });

export default compose(
	withRouter,
	connect(
		null,
		{
			login: authActions.login,
			getUser: authActions.getProfile
		}
	),
	withFormik({
		displayName: 'loginForm',
		handleSubmit: async (values, { props, setSubmitting }) => {
			const { login, history, match, getUser, getWallet } = props;
			history.push(RECOVERY_OTP_PATH)
		}
	})
);
