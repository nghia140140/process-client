import { compose } from 'recompose';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';

import { authActions } from '~/state/ducks/authUser';
import { LOGIN_PATH, APP_DEFAULT_PATH, SETUP_PROFILE_PATH } from '~/configs/routesConfig';
import { showError } from '~/configs/ServerErrors';
import { passwordValidate, phoneOrEmailValidate } from '~/views/utilities/validation/input';
import { getBool } from '~/views/utilities/helpers/utilObject';


const validationSchema = yup.object().shape({
	password: passwordValidate,
	username: phoneOrEmailValidate
});

export default compose(
	withRouter,
	connect(
		null,
		{
				login: authActions.login,
				getProfile: authActions.getProfile
		}
	),
	withFormik({
		displayName: 'loginForm',
		mapPropsToValues: props =>({
			username: '',
			password: '',
			rememberMe: true
		}),
		validationSchema: validationSchema,
		handleSubmit: async (values, { props, setSubmitting }) => {
			const { login, getProfile, history } = props;
			login(values)
			// .then(()=> getProfile())
			.then(({res})=>{
				setSubmitting(false)

				// harcode -> waiting api
				if(true){
					history.push(SETUP_PROFILE_PATH);
				}
				else{
					history.push(APP_DEFAULT_PATH);
				}
			})
			.catch(err=> {
				console.log(err);
				showError(err)
				setSubmitting(false)
			})
			

		}
	})
);
