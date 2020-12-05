import { Form } from 'antd';
import styled, { css } from 'styled-components';

const largeSize = css`
	height: 47px;
	padding-right: 13px;
`;
const defaultSize = css`
	height: 35px;
	font-size: 13px;
`;

export const FieldStyle = styled(Form.Item)`
	width: 100%;
	display: block;
	margin-bottom: ${props => (props.mBottom ? props.mBottom : '10px')};

	.ant-input {
		${props => (props.size === 'large' ? largeSize : defaultSize)};
	}
	.ant-input-number-input {
		${props => (props.size === 'large' ? largeSize : defaultSize)};
	}
	.ant-calendar-picker {
		width: 100%;
	}
`;

export const RadioBoxFieldStyle = styled(Form.Item)`
	margin-bottom: ${props => (props.mBottom ? props.mBottom : '24px')};
	.ant-radio-wrapper,
	.ant-checkbox-wrapper {
		${props =>
			props.vertical &&
			css`
				display: block;
				margin-bottom: ${props =>
					props.gutterbottom ? props.gutterbottom : '8px'};
			`}
	}
`;

export const TextAreaFieldStyle = styled(Form.Item)`
	width: 100%;
	margin-bottom: ${props => (props.mBottom ? props.mBottom : '10px')};
	display: block;
`;

export const SelectStyle = styled(Form.Item)`
	display: block;
	margin-bottom: ${props => (props.mBottom ? props.mBottom : '10px')};
	.ant-select-selection {
		${props => (props.size === 'large' ? largeSize : defaultSize)};
		${props =>
			props.mode === 'multiple' &&
			css`
				height: auto;
			`}
	}
	.ant-select-selection__rendered {
		line-height: ${props => (props.size === 'large' ? '45px' : '33px')};
	}
`;

export const ReStyle = styled.div`
	padding-bottom: 18px;
	select,
	input {
		width: 100%;
		border: 1px solid #ced4da;
		height: 42px;
		display: flex;
		padding: 0;
		padding-left: 10px;
		border-radius: 4px;
		box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.02),
			0 1px 3px 0 rgba(50, 50, 93, 0.15);
		border-color: #fdfdfd;
	}
`;

export const PieButton = styled.button`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 1px solid #77909d;
	background: #fff;
	text-align: center;
	display: inline-block;
	line-height: 20px;
	padding: 0;
	margin: 0;
	cursor: pointer;
	position: absolute;
	right: -8px;
	top: 10px;

	&:hover {
		color: red;
		border-color: red;
	}
`;

export const RemovePieButton = styled.button`
	background: #fff;
	border: none;
	cursor: pointer;
	position: absolute;
	top: 10px;
	&:hover {
		color: red;
		border-color: red;
	}
`;

export const AddPieButton = styled.button`
	border-radius: 50%;
	border: 1px solid #77909d;
	margin: 0 5px 0 0px;
	color: #f6821f;
	&:hover {
		color: #f6821f;
		border-color: #f6821f;
	}
`;

export const EditorStyle = styled.div`
	padding: 10px 0;
	.quill {
		background: #fff;
		border-radius: 0.5em;
	}

	.ql-container {
		border-bottom-left-radius: 0.5em;
		border-bottom-right-radius: 0.5em;
	}

	.ql-editor {
		min-height: 18em;
	}

	.ql-bubble .ql-editor {
		border: 1px solid #ccc;
		border-radius: 0.5em;
	}

	.ql-snow.ql-toolbar {
		display: block;
		background: #eaecec;
		border-top-left-radius: 0.5em;
		border-top-right-radius: 0.5em;
	}
`;
