import { compose } from 'recompose';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';

import { authActions } from '~/state/ducks/authUser';
import { RECOVERY_OTP_PATH } from '~/configs/routesConfig';
import { showError } from '~/configs/ServerErrors';
import { phoneOrEmailValidate } from '~/views/utilities/validation/input';
import { getString } from '~/views/utilities/helpers/utilObject';

const validationSchema = yup.object().shape({
	login: phoneOrEmailValidate,
});

export default compose(
	withRouter,
	connect(
		null,
		{
			resetPassword: authActions.resetPasswordInit
		}
	),
	withFormik({
		displayName: 'recoveryInputForm',
		validationSchema: validationSchema,
		mapPropsToValues: props =>({
			login: ''
		}),
		handleSubmit: async (values, { props, setSubmitting }) => {
			const { resetPassword, history, match, getUser, getWallet } = props;
			resetPassword({login: values.login.trim()})
			.then(res=>{
				setSubmitting(false)
				history.push(`${RECOVERY_OTP_PATH.replace(':account', values.login)}?key=${getString(res,'res.resetKey','')}`)
			})
			.catch(err=>{
				setSubmitting(false)
				showError(err)
			})
		}
	})
);
