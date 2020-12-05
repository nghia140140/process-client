import React from 'react';
import { Wrapper} from './styles';
import { LoginForm, OTPForm } from '~/views/presentation/AuthForm';
import styled, { keyframes } from 'styled-components';
import { IntroduceForm, ChangePassForm, RegisterForm, RegisterFinishForm } from '../../presentation/AuthForm';
import RecoveryInputInfo from '../../presentation/AuthForm/RecoveryInputInfo';
import { withRouter } from 'react-router-dom';
import { LOGIN_PATH, ACCOUNT_RECOVERY_PATH, RECOVERY_OTP_PATH, RECOVERY_CHANGE_PASSWORD_PATH , REGISTER_PATH, REGISTER_COMPLETED_PATH, REGISTER_OTP_PATH  } from '~/configs/routesConfig';
import Animate from 'react-smooth'
const queryString = require('query-string');


const ContentWrapper = styled.div`
	flex: 1;
	background-color: #FFF;
`
const LeftContent = styled.div``
const RightContent = styled.div`
	background-color: rgb(7,72,128);
	justify-content: center;
	align-items: center;
	display: flex;
	min-height: 100vh;
}
`


class Login extends React.PureComponent{

	renderRightContent =()=>{

		switch(this.props.match.path){
			case LOGIN_PATH:{
				return <LoginForm />
			}
			case ACCOUNT_RECOVERY_PATH:{
				return <RecoveryInputInfo />
			}
			case RECOVERY_OTP_PATH:{
				return <OTPForm/>
			}
			case REGISTER_OTP_PATH:{
				return <OTPForm/>
			}
			case RECOVERY_CHANGE_PASSWORD_PATH:{
				return <ChangePassForm/>
			}
			case REGISTER_PATH:{
				return <RegisterForm />
			}
			case REGISTER_COMPLETED_PATH:{
				return <RegisterFinishForm />
			}
		}
	}	
	componentDidMount(){
		window.scrollTo(0, 0)
	}
	render(){
		const steps = [{
			style: {
				opacity: 0,
			},
			duration: 200,
		}, {
			style: {
				opacity: 1
			},
			duration: 200,
		},{
			style: {
				opacity: 0.9
			},
			duration: 100,
		}];

		return (
			<Wrapper>
				<ContentWrapper className='row flex-row-reverse mx-0'>
								<RightContent className='col-sm-12 col-md-6 col-lg-4 px-5'>
									<Animate steps={steps}>
												<div className='w-100'>{this.renderRightContent()}</div>
									</Animate>
								</RightContent>
							<LeftContent className='col-sm-12 col-md-6 col-lg-8 px-5'>
								<IntroduceForm/>
							</LeftContent>
				</ContentWrapper>
			</Wrapper>
		);
	}
}


export default withRouter(Login)
