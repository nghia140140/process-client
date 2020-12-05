import React from 'react';
import { Upload,  Spin, Avatar } from 'antd';
import { checkAvartarImage } from './checkUploadFile';
import { API_UPLOAD_URL, THUMB_IMG_URL } from '~/configs';
import { AvatarUploadWrapper, AvatarOverlay } from './styles';
import { LoadingOutlined } from '@ant-design/icons';
import { UIIcon } from '../commons';

const AvatarUploadAnchor = props => {
	const baseConfig = {
		icon: props.icon ? props.icon : 'picture',
		shape: 'square',
		size: parseInt(props.size)
	};
	const config = props.avatarURL
		? { ...baseConfig, src: props.avatarURL }
		: baseConfig;
	return (
		<AvatarOverlay
			disabled={props.disabled}
			shape={props.shape}
			size={props.size}
		>
			<Spin indicator={antIcon} spinning={props.loading}>
				<Avatar {...config} />
			</Spin>
			{!props.disabled && (
				<div className="overlay">
					<UIIcon type="uploadImage" size={160} />
				</div>
			)}
		</AvatarOverlay>
	);
};

const antIcon = <LoadingOutlined style={{ fontSize: 24 }}  />;

class AvatarUpload extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			image: props.avatarUrl,
			loading: false
		};
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			image: nextProps.avatarUrl,
			loading: false
		});
	}
	handleChangeAvatar = info => {
		const { onChange } = this.props;
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			const { response } = info.file;
			const avatarUrl = response.data.file.origin;
			this.setState({
				avatarUrl,
				loading: false
			});
			onChange(avatarUrl);
		}
	};
	render() {
		const {  shape, size, icon, disabled } = this.props;
		const { image, loading } = this.state;
		return (
			<AvatarUploadWrapper size={size} >
				<Upload
					name="file"
					listType="picture-card"
					className="avatar-uploader"
					disabled={false}
					showUploadList={false}
					size={size}
					action={API_UPLOAD_URL}
					beforeUpload={checkAvartarImage}
					onChange={this.handleChangeAvatar}
				>
					<AvatarUploadAnchor
						loading={loading}
						avatarURL={this.props.avatarUrl ? THUMB_IMG_URL + image : null}
						disabled={false}
						shape={shape}
						size={size}
						icon={icon}
					/>
				</Upload>
			</AvatarUploadWrapper>
		);
	}
}

export default AvatarUpload;
