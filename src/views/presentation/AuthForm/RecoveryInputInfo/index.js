import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { Form } from 'antd';
import enhance from './withForm';
import { InputField } from '~/views/presentation/ui/fields';
import { UIButton } from '~/views/presentation/ui/buttons';
import styled from 'styled-components'
import strings from '~/localization';
import { LOGIN_PATH,  REGISTER_PATH } from '~/configs/routesConfig';

const FormStyled = styled(Form)`
	width: 100%;
	.login  {color: #FFF}
	.login_anotation { color: rgba(255,255,255,0.8); font-style: italic; font-weight: 400;}
	div div button:hover { color: rgba(255,255,255,0.8); text-decoration: none; border: none;}
	div div button { color: rgba(255,255,255,0.4); text-decoration: none; font-style: italic; border: none;}
`


class RecoveryInputInfo extends PureComponent {
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
				<h3 className='login'>{strings.recovery}</h3>
				<p className='login_anotation mb-5'>{strings.recovery_anotation}</p>
				<InputField
					validatestatus={touched.login && errors.login ? 'error' : undefined}
					help={touched.login && errors.login ? errors.login : ''}
					name="login"
					autoFocus
					value={values.login}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder={strings.login_placeholder}
				/>

				<Row type="flex" align="middle"  className="mt-4">
					<Col>
						<UIButton
							type="primary"
							htmlType="submit"
							loading={isSubmitting}
							disabled={!isValid}>
							<span>{strings.continue}</span>
						</UIButton>
					</Col>
				</Row>
				<Row type='flex' className='mt-3' >
					<Col>
							<button className='btn btn-link mx-0 px-0' type='button' onClick={()=> {history.push(LOGIN_PATH)}}>{strings.wanna_login}</button>
							<button className='btn btn-link ml-4 px-0' type='button' onClick={()=>history.push(REGISTER_PATH)}>{strings.register_an_account}</button>
					</Col>
				</Row>
			</FormStyled>
		);
	}
}

export default enhance(RecoveryInputInfo)
