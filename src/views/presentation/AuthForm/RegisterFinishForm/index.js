import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { Form } from 'antd';
import enhance from './withForm';
import { InputField } from '~/views/presentation/ui/fields';
import { UIButton } from '~/views/presentation/ui/buttons';
import styled from 'styled-components'
import strings from '~/localization';
import { LOGIN_PATH, RECOVERY_OTP_PATH, REGISTER_PATH } from '~/configs/routesConfig';

const FormStyled = styled(Form)`
	width: 100%;
	.login  {color: #FFF}
	.login_anotation { color: rgba(255,255,255,0.8); font-style: italic; font-weight: 400;}
	div div button:hover { color: rgba(255,255,255,0.8); text-decoration: none; border: none;}
	div div button { color: rgba(255,255,255,0.4); text-decoration: none; font-style: italic; border: none;}
`
const ThanksStyled = styled.div`
	p {color: #FFF; font-weight: 500; margin-bottom: 20px; }
`
const DownloadStyled = styled.div`
	display: flex; justify-content: center; margin-bottom: 20px;
	div {
		background-color: rgb(159,197,248); 	display: flex; padding: 0px 10px; border-radius: 4px;
		a { 
			height: 45px; display: flex; align-items: center; margin-left: 10px; margin-right: 10px; 
			span { color: #FFF; margin-left: 5px; font-size: 15px; font-weight: bold;}
			i {color: #FFF; font-size: 25px;}
		}
	}
	
`

class RegisterFinishForm extends PureComponent {
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
				<h3 className='login'>{strings.register}</h3>
				<ThanksStyled className='mt-5' dangerouslySetInnerHTML={{__html: strings.completed_registry}}></ThanksStyled>
			
				<DownloadStyled>
						<div>
							<a>
								<i class="fa fa-apple" aria-hidden="true"></i>
								<span>{strings.download}</span>
							</a>
							<a>
								<i class="fa fa-google" aria-hidden="true"></i>
								<span>{strings.download}</span>
							</a>
						</div>
				</DownloadStyled>
				<Row type='flex' className='mt-3' >
					<Col>
							<button className='btn btn-link mx-0 px-0' type='button' onClick={()=> {history.push(LOGIN_PATH)}}>{strings.wanna_login}</button>
					</Col>
				</Row>
			</FormStyled>
		);
	}
}

export default enhance(RegisterFinishForm)
