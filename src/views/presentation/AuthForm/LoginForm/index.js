import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { Form } from 'antd';
import enhance from './withForm';
import { InputField } from '~/views/presentation/ui/fields';
import { UIButton } from '~/views/presentation/ui/buttons';
import styled from 'styled-components'
import strings from '../../../../localization';
import { ACCOUNT_RECOVERY_PATH, REGISTER_PATH } from '~/configs/routesConfig';


const FormStyled = styled(Form)`
	width: 100%;
	.login  {color: #FFF}
	.login_anotation { color: rgba(255,255,255,0.8); font-style: italic; font-weight: 400;}
	div div button:hover { color: rgba(255,255,255,0.8); text-decoration: none; border: none;}
	div div button { color: rgba(255,255,255,0.4); text-decoration: none; font-style: italic; border: none;}
`


class LoginForm extends PureComponent {
	render() {
		const {
			handleSubmit,
			values,
			handleChange,
			handleBlur,
			touched,
			errors,
			isValid,
			isSubmitting,
			history
		} = this.props;

		return (
			<FormStyled onFinish={handleSubmit}>
				<h3 className='login'>{strings.login}</h3>
				<p className='login_anotation mb-5'>{strings.login_anotation}</p>
				<InputField
					validatestatus={touched.username && errors.username ? 'error' : undefined}
					help={touched.username && errors.username ? errors.username : ''}
					name="username"
					autoFocus
					value={values.username}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder={strings.login_placeholder}
				/>
				<InputField
					validatestatus={
						touched.password && errors.password ? 'error' : undefined
					}
					help={touched.password && errors.password ? errors.password : ''}
					name="password"
					type="password"
					iconEnd="password"
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder={strings.password}
					typeIcon="pass"
					size="large"
				/>

				<Row type="flex" align="middle"  className="mt-4">
					<Col>
						<UIButton
							type="primary"
							htmlType="submit"
							loading={isSubmitting}
							disabled={!isValid}>
							<span>{strings.login}</span>
						</UIButton>
					</Col>
				</Row>
				<Row type='flex' className='mt-3' >
					<Col>
							<button className='btn btn-link mx-0 px-0' type='button' onClick={()=>{history.push(ACCOUNT_RECOVERY_PATH)}}>{strings.forgot_password}</button>
							<button className='btn btn-link ml-4 px-0' type='button' onClick={()=>history.push(REGISTER_PATH)}>{strings.register_an_account}</button>
					</Col>
				</Row>
			</FormStyled>
		);
	}
}

export default enhance(LoginForm);
