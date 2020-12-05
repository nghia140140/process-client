import _ from 'lodash';
import { IMAGE_URL } from '~/configs';

export function getString(obj, propertyPath = undefined,  defaultValue = undefined) {
    try {
        // propertyPath phải là string hoặc undefined 
        if (!_.isUndefined(propertyPath) && !_.isString(propertyPath)) { return undefined; }
        if (!_.isNil(propertyPath)) {
            if (_.isNil(obj)) { return defaultValue; }
            if (_.isObject(obj)) {
                var properties = propertyPath.split('.');
                // tìm property value từ property path
                let result = properties.reduce((prev, curr) => prev && prev[curr], obj);
                return _.isString(result) ? result : defaultValue;
            }
        }
        else if (_.isString(obj)) {
            return obj;
        }

    } catch (err) {
        console.log(err);
    }
    return defaultValue;
}

export function getNumber(obj, propertyPath = undefined, defaultValue = undefined){
    try {
        // propertyPath phải là string hoặc undefined 

        const fixedFloatNumber =(value)=>{
            return parseFloat(Number(value).toFixed(0));
        }
        if(!_.isUndefined(propertyPath) &&  !_.isString(propertyPath)){ return undefined;}
        if(!_.isNil(propertyPath)){
            if(_.isNil(obj)){ return defaultValue;}
            if(_.isObject(obj)){
                var properties =  propertyPath.split('.');
                // tìm property value từ property path
                let result =  properties.reduce((prev, curr) => prev && prev[curr], obj);
                return _.isNumber(result) ? fixedFloatNumber(result) : defaultValue;
            } 
        }
        else if(_.isNumber(obj)){
            return fixedFloatNumber(obj)
        }

    } catch (err) {
        console.log(err);
    }   
    return defaultValue;
}

export function getBool(obj, propertyPath = undefined, defaultValue = undefined) {
    try {
        // propertyPath phải là string hoặc undefined 
        if (!_.isUndefined(propertyPath) && !_.isString(propertyPath)) { return undefined; }
        if (!_.isNil(propertyPath)) {
            if (_.isNil(obj)) { return defaultValue; }
            if (_.isObject(obj)) {
                var properties = propertyPath.split('.');
                // tìm property value từ property path
                let result = properties.reduce((prev, curr) => prev && prev[curr], obj);
                return _.isBoolean(result) ? result : defaultValue;
            }
        }
        else if (_.isBoolean(obj)) {
            return obj;
        }
    } catch (err) {
        console.log(err);
    }
    return defaultValue;
}

export function getArray(obj, propertyPath = undefined, defaultValue = undefined) {
    try {
        // propertyPath phải là string hoặc undefined 
        if (!_.isUndefined(propertyPath) && !_.isString(propertyPath)) { return undefined; }
        if (!_.isNil(propertyPath)) {
            if (_.isNil(obj)) { return defaultValue; }
            if (_.isObject(obj)) {
                var properties = propertyPath.split('.');
                // tìm property value từ property path
                let result = properties.reduce((prev, curr) => prev && prev[curr], obj);
                return _.isArray(result) ? result : defaultValue;
            }
        }
        else if (_.isArray(obj)) {
            return obj;
        }
    } catch (err) {
        console.log(err);
    }
    return defaultValue;
}

export function getObject(obj, propertyPath = undefined) {
    try {
        // propertyPath phải là string hoặc undefined 
        if (!_.isUndefined(propertyPath) && !_.isString(propertyPath)) { return undefined; }
        if (!_.isNil(propertyPath)) {
            if (_.isNil(obj)) { return undefined; }
            if (_.isObject(obj)) {
                var properties = propertyPath.split('.');
                // tìm property value từ property path
                let result = properties.reduce((prev, curr) => prev && prev[curr], obj);
                return _.isObject(result) ? result : undefined;
            }
        }
        else if (_.isObject(obj)) {
            return obj;
        }
    } catch (err) {
        console.log(err);
    }
    return undefined;
}

export const isNullOrEmpty = (value) => {
    return _.isNil(value) || (!_.isNil(value) && _.isString(value) && (value || '').trim().length === 0)
}

export function getMatchedValueWithRegex(val, reg) {
    let results = (val || '').match(reg) || [];
    return _.first(results) || '';
}


export const firstImage=(strImages, width)=>{
    let imgUrls = _.first((strImages || '').split('|'))
    return `${IMAGE_URL}${_.isNumber(width) ? `${width}/`: '' }${imgUrls}`
}


export const removeSignThenLowerCaseString =(value)=>{
    return (getString(value) || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .toLocaleLowerCase()
    .trim()
}


export function getIntlStr(formatMessage, intlMess, item) {
    if (typeof intlMess[item] === 'undefined') return item
    return formatMessage(intlMess[item])
}


/**
 * 
 * @param {*} addressItem 
 */
export const formatAddress =(addressItem)=>{
    return [getString(addressItem, 'address1'), getString(addressItem, 'wardsName'), getString(addressItem, 'districtName'), getString(addressItem, 'provinceName')]
    .filter(item => !isNullOrEmpty(item)).join(', ')
}

export const getActiveOrDefaultPhone=(phones)=>{
    let result = getString((phones || []).find(item => item.isDefault === true), 'phoneNumber')
    if(_.isNil(result)){
        return getString(_.first(getArray(phones) || []), 'phoneNumber')
    }   
    return result
}
