import {message} from 'antd'
message.config({
	maxCount: 1,
	duration: 2
})

/**
 * CONFIGS
 */
export const API_URL = process.env.DOMAIN
export const CKEDITOR_URL_IMG = ''
export const API_UPLOAD_URL = ''
export const IMAGE_URL = ''
export const THUMB_IMG_URL =''

export const sizes = {
	xl: '1200px',
	lg: '992px',
	md: '768px',
	sm: '576px'
};

export const imgUploadConfig = {
	minWidth: 750,
	minHeight: 500,
	fileSize: 10,
	type: /\.(jpg|jpeg|bmp|png|pdf|doc|xls|xlsx)$/i
};

export const API_CODE = {
	SUCCESS: 'SUCCESS',
	AUTHENTICATION_INVALID: 'AUTHENTICATION_INVALID',
	UNAUTHORIZED: 'UNAUTHORIZED'
};

export const JWT = 'jwt_' + API_URL