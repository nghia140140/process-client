import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';

const ContentWrapperStyle = styled.div`
	padding: 20px;
	background-color: #e9e9e9;
`

function ContentWrapper(props) {
	const { children, title, tools, mb } = props;
	return (
		<ContentWrapperStyle>
			{children}
		</ContentWrapperStyle>
	);
}

ContentWrapper.propTypes = {
	title: PropTypes.string,
	tools: PropTypes.any,
	mb: PropTypes.number
};

export default ContentWrapper;
