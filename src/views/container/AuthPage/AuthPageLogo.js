import React from 'react';
import { LogoWrapper } from './styles';
import Logo from '~/static/images/logo.png';

function AuthPageLogo() {
	return (
		<LogoWrapper>
			<img src={Logo} alt="App logo" style={{ maxWidth: 200 }} />
		</LogoWrapper>
	);
}

export default AuthPageLogo;
