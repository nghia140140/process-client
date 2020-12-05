import React from 'react';
import { message } from 'antd';
import { imgUploadConfig } from '~/configs';

const returnResult = (result, file) =>
	new Promise((resolve, reject) => {
		if (!result) {
			reject(file);
		} else {
			resolve(file);
		}
	});

export const checkFileSize = file => {
	const isLt10M = file.size / 1024 / 1024 < imgUploadConfig.fileSize;

	if (!isLt10M) {
		message.error('Dung lượng tối đa hình ảnh là 10 MB');
	}
	return isLt10M;
};

export const checkImageRatio = file => {
	const img = new Image();

	img.onload = function() {
		const { width, height } = this;
		const { minHeight, minWidth } = imgUploadConfig;
		if (width <= minWidth || height <= minHeight || width / height !== 1.5) {
			message.warning('Size hình không đúng chuẩn 1.5 x 1.0');
		}
	};

	img.src = window.URL.createObjectURL(file);
};

export const checkListLength = (list, limit) => {
	const isNotGtr = list.length < limit;
	if (!isNotGtr) {
		message.error(`Bạn chỉ được upload tối đa ${limit} hình`);
	}
	return isNotGtr;
};

export const checkDefaultImageType = file => {
	const validFileType = imgUploadConfig.type.test(file.name);
	if (!validFileType) {
		message.error('Hình ảnh tải lên chưa đúng định dạng PNG, JPG, BMP');
	}
	return validFileType;
};

export function checkDefaultImage(file, list, lengthLimit, checkRatio) {
	const validFileType = checkDefaultImageType(file);
	const isLt10M = checkFileSize(file);
	const isLengthValid = checkListLength(list, lengthLimit);
	const result = validFileType && isLt10M && isLengthValid;

	if (result) {
		if (checkRatio) {
			checkImageRatio(file);
		}
	}
	return result;
}

export function checkAvartarImage(file) {
	const validFileType = checkDefaultImageType(file);
	const isLt10M = checkFileSize(file);
	const result = validFileType && isLt10M;
	return returnResult(result, file);
}
