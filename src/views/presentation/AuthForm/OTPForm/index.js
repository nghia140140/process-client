import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { Form } from 'antd';
import enhance from './withForm';
import { InputField } from '~/views/presentation/ui/fields';
import { UIButton } from '~/views/presentation/ui/buttons';
import styled from 'styled-components'
import strings from '../../../../localization';
import { ACCOUNT_RECOVERY_PATH, REGISTER_OTP_PATH, REGISTER_PATH, RECOVERY_OTP_PATH } from '~/configs/routesConfig';
import OTPInput from '~/views/presentation/ui/libOTPInput';
import { getString } from '~/views/utilities/helpers/utilObject';
import { phoneRegex } from '~/views/utilities/validation/input';
const queryString = require('query-string');

const FormStyled = styled(Form)`
	width: 100%;
	.login  {color: #FFF}
	.email { color: #FFF}
	.otp_send { color: #FFF; font-style: italic;}
	.login_anotation { color: rgba(255,255,255,0.8); font-style: italic; font-weight: 400;}
	div div button:hover { color: rgba(255,255,255,0.8); text-decoration: none; border: none;}
	div div button { color: rgba(255,255,255,0.4); text-decoration: none; font-style: italic; border: none;}
`
const OTPStyle = styled(OTPInput)`
	input {font-weight: bold;}
`

class OTPForm extends PureComponent {
	constructor(props){
		super(props)
		const {setOTP} = this.props
		let params = queryString.parse(this.props.location.search)
		setOTP(params.code)
	}
	
	handleChange = otp => this.setState({ otp });
	render() {
		const {
			handleSubmit,
			OTP,
			setOTP,
			isSubmitting,
			history
		} = this.props;

		let formTitle = ''
		let formAnotation = ''
		switch(this.props.match.path){
			case REGISTER_OTP_PATH: 
				formTitle = strings.active_account 
				formAnotation = strings.active_account_anotation
				break
			case RECOVERY_OTP_PATH:
				formTitle = strings.recovery
				formAnotation = strings.recovery_anotation
				break
			default: break
		}
		let account = this.props.match.params.account


		return (
			<FormStyled onFinish={handleSubmit}>
				<h3 className='login'>{formTitle}</h3>
				<p className='login_anotation mb-4'>{formAnotation}</p>
				<p className='email'>{strings.formatString(strings.your_account,{account: this.props.match.params.account})}</p>
				<div className='my-4'>
        <OTPStyle
					value={OTP}
					onChange={(otp)=>{setOTP(otp)}}
					autoFocus
					OTPLength={6}
					otpType="number"
					disabled={false}
				/>
      </div>

				<p className='otp_send'>{
				  RegExp(phoneRegex).test(account) ? strings.formatString(strings.phone_otp_sent,{phone: account}) :  strings.formatString(strings.email_otp_sent,{email: account})
				}</p>

				<Row type="flex" align="middle"  className="mt-4">
					<Col>
						<UIButton
							type="secondary"
							htmlType="button"
							onClick={()=> history.goBack()}>
							<span>{strings.back}</span>
						</UIButton>
						<UIButton
							type="primary"
							htmlType="submit"
							className='ml-3'
							loading={isSubmitting}
							disabled={getString(OTP, undefined,'').length !== 6}>
							<span>{strings.continue}</span>
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

export default enhance(OTPForm);
