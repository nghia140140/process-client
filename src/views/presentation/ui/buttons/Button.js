import styled, { css } from 'styled-components';
import { Button } from 'antd';
import Color from '~/views/utilities/layout/color';

export default styled(Button)`
	border-radius: ${props => (props.border ? props.border + 'px' : '2px')};
	min-width: 125px;
	height: 35px;
	// text-transform: uppercase;
	${props => {
		let cBorder = 'none',
			cBackgroundColor = Color.lightgray,
			cColor = Color.white;
		if (!props.disabled) {
			switch (props.type) {
				case 'primary':
					if (props.ghost) {
						cBorder = `solid 1px ${Color.yellow}`;
						cBackgroundColor = `${Color.white} !important`;
						cColor = Color.yellow;
					} else {
						cBackgroundColor = Color.yellow;
					}
					break;
				case 'secondary':
					if (props.ghost) {
						cBorder = `solid 1px ${Color.blue}`;
						cBackgroundColor = `${Color.white} !important`;
						cColor = Color.blue;
					} else {
						cBackgroundColor = Color.blue;
					}
					break;
				default:
					return null;
			}
		}
		return css`
			&& {
				background-color: ${cBackgroundColor};
				color: ${cColor};
				border: ${cBorder};
				&:hover {
					border: ${cBorder};
					background-color: ${cBackgroundColor};
					color: ${cColor};
				}
			}
		`;
	}};
`;
