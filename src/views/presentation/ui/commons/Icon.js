import React from 'react';
import styled from 'styled-components';
import { ReactComponent as User } from '~/static/icons/user.svg';
import { ReactComponent as Phone } from '~/static/icons/phone.svg';
import { ReactComponent as Email } from '~/static/icons/email.svg';
import { ReactComponent as Pass } from '~/static/icons/pass.svg';
import { ReactComponent as Calendar } from '~/static/icons/calendar.svg';










export const renderIcon = type => {
	switch (type) {
		case 'user':
			return <User />;
		case 'phone':
			return <Phone />;
		case 'email':
			return <Email />;
		case 'pass':
			return <Pass />;
		case 'calendar':
			return <Calendar />;
		default:
			return null;
	}
};

const IconStyle = styled.i`
	svg {
		width: 1em;
		height: 1em;
	}
`;

const UIIcon = ({ typeIcon, size, ...rest }) => {
	return (
		<IconStyle
			className="anticon"
			style={{ fontSize: size ? size + 'px' : '14px'}}
			{...rest}
		>
			{renderIcon(typeIcon)}
		</IconStyle>
	);
};

export const MDIcon = ({ name, size, ...rest }) => {
	return (
		<i
			className={`mdi ${name}`}
			style={{ fontSize: size ? size + 'px' : '14px' }}
			{...rest}
		/>
	);
};

export default UIIcon;
