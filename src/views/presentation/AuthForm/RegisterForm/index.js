import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { Form, Checkbox } from 'antd';
import enhance from './withForm';
import { InputField, SelectField, TextAreaField } from '~/views/presentation/ui/fields';
import { UIButton } from '~/views/presentation/ui/buttons';
import styled from 'styled-components'
import strings from '../../../../localization';
import { LOGIN_PATH , REGISTER_COMPLETED_PATH } from '~/configs/routesConfig';

const FormStyled = styled(Form)`
	width: 100%;
	.login  {color: #FFF}
	.login_anotation { color: rgba(255,255,255,0.8); font-style: italic; font-weight: 400;}
	div div button:hover { color: rgba(255,255,255,0.8); text-decoration: none; border: none;}
	div div button { color: rgba(255,255,255,0.4); text-decoration: none; font-style: italic; border: none;}
`
const CheckBoxStyled = styled(Checkbox)`
	span:last-child { color: #FFF; color: #FFF; font-size: 13px; font-weight: normal; font-style: italic;}
`


class RegisterForm extends PureComponent {
	render() {
		const {
			handleSubmit,
			values,
			handleChange,
			handleBlur,
			touched,
			errors,
			isValid,
			setFieldValue,
			isSubmitting,
			history
		} = this.props;

		return (
			<FormStyled onFinish={handleSubmit}>
				<h3 className='login'>{strings.register}</h3>
				<p className='login_anotation mb-5'>{strings.register_anotation}</p>
				<div className='row'>
					<div className='col-6 pr-2'>
						<InputField
							validatestatus={touched.firstName && errors.firstName ? 'error' : undefined}
							help={touched.firstName && errors.firstName ? errors.firstName : ''}
							name="firstName"
							autoFocus
							value={values.firstName}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder={strings.first_name}
							size="large"
						/>
					</div>
					<div className='col-6 pl-2'>
						<InputField
							validatestatus={touched.lastName && errors.lastName ? 'error' : undefined}
							help={touched.lastName && errors.lastName ? errors.lastName : ''}
							name="lastName"
							value={values.lastName}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder={strings.last_name}
						/>
					</div>
				</div>
				<InputField
					validatestatus={touched.login && errors.login ? 'error' : undefined}
					help={touched.login && errors.login ? errors.login : ''}
					name="login"
					value={values.login}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder={strings.email_or_phone}
				/>
				<InputField
					validatestatus={touched.password && errors.password ? 'error' : undefined}
					help={touched.password && errors.password ? errors.password : ''}
					name="password"
					type='password'
					iconEnd="password"
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder={strings.password}
				/>
				<InputField
					validatestatus={touched.reenterPasword && errors.reenterPasword ? 'error' : undefined}
					help={touched.reenterPasword && errors.reenterPasword ? errors.reenterPasword : ''}
					name="reenterPasword"
					type='password'
					iconEnd="password"
					value={values.reenterPasword}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder={strings.reenter_password}
				/>
				<div className='mb-5'><CheckBoxStyled value={values.termAgree} onChange={()=>{ setFieldValue('termAgree' ,!values.termAgree) }}>{strings.agree_agriSys_term}</CheckBoxStyled></div>
				<Row type="flex" align="middle"  className="mt-4">
					<Col>
						<UIButton
							type="primary"
							htmlType="submit"
							loading={isSubmitting}
							disabled={!(values.termAgree && isValid) }>
							<span>{strings.register}</span>
						</UIButton>
					</Col>
				</Row>
				<Row type='flex' className='mt-3' >
					<Col>
							<button className='btn btn-link mx-0 px-0' type='button' onClick={()=>{history.push(LOGIN_PATH)}}>{strings.login_with_your_account}</button>
					</Col>
				</Row>
			</FormStyled>
		);
	}
}

export default enhance(RegisterForm);
