/*eslint-disable */
import React from 'react';
import * as yup from "yup";
import strings from '~/localization';

/** Regex Validation **/
export const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}/i;
const isEmailOrPhone = /^[a-zA-Z0-9\+]*$/
// /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$|^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}/i

const passwordSchema = yup.string().min(6, strings.invalid_password);

export const emailValidate = yup.string().trim().matches(emailRegex, strings.invalid_email).required(strings.email_required);
export const emailNRValidate = yup.string().trim().matches(emailRegex, strings.invalid_email)

export const phoneValidate = yup.string().trim().matches(phoneRegex, strings.invalid_phone).required(strings.invalid_phone);
export const phoneNRValidate = yup.string().trim().matches(phoneRegex, strings.invalid_phone)

export const numberValidate = yup.number().required(strings.required).moreThan(0, strings.more_than_zero)
export const passwordValidate = passwordSchema.required(strings.password_required).max(60, strings.formatString(strings.max_length,{max: 60}));
export const passwordConfirmationValidate = passwordValidate.oneOf([yup.ref('password'), null], strings.password_not_matched)

export const phoneOrEmailValidate = yup.string().trim().required(strings.phone_or_email_required).matches(isEmailOrPhone, strings.invalid_email_or_phone).max(50,strings.formatString(strings.max_length,{max:50}));

export const numberRequiredField = yup.number().required(strings.required)
export const stringRequiredField = (message, maxLength = 255) => yup.string().trim().required(message || strings.required).max(maxLength,strings.formatString(strings.max_length,{max: maxLength}))
