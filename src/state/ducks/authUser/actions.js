import * as types from './types';
import apiAction, { defaultAction } from '../utils/createAction';


export const testLogin = (data) => defaultAction(types.LOGIN_SUCCESS, data)
export const register = data => apiAction('post')(types.COMMON, '/api/auth/register', data, false)
export const activeAccount = (activationKey,otp) => apiAction('get')(types.COMMON, `/api/v1/sys/account/activate?activationKey=${activationKey}&otp=${otp}`, {}, false)
export const resetPasswordInit = (data) => apiAction('post')(types.COMMON, `/api/v1/sys/account/reset-password/init`, data, false)
export const validateResetPasswordOTP = (data) => apiAction('post')(types.VERIFY_OTP, `/api/v1/sys/account/reset-password/validate-otp`, data, false)
export const resetPasswordFinish = (data) => apiAction('post')(types.COMMON, `/api/v1/sys/account/reset-password/finish`, data, false)
export const login = data => apiAction('post')(types.COMMON, '/api/auth/login', data, false);
export const getProfile = () => apiAction('get')(types.GET_USER, '/services/sys/api/v1/sys-accounts/profile', null, true);

/**
 * update profile
 */
export const updateProfile = (body) => apiAction('post')(types.UPDATE_PROFILE, '/services/sys/api/v1/sys-accounts/profile', body, true);


export const logout = () => defaultAction(types.LOGOUT);