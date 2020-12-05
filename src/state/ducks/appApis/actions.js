import * as types from './types';
import apiAction, { defaultAction } from '../utils/createAction';

/**
 * Services
 */

 let services = {
   sys: '/services/sys'
 }


/**
 * identity type resource
 */
export const getIdentityTypes = () => apiAction('get')(types.COMMON, services.sys + '/api/identity-types', {}, true)

/**
 * locations
 */
export const getProvinces = () => apiAction('get')(types.COMMON, services.sys + '/api/v1/provinces', {}, true)
export const getDistrict = (provinceId) => apiAction('get')(types.COMMON, services.sys + '/api/v1/districts?provinceId=' + provinceId, {}, true)

/**
 * addresses
 */
export const getAddressTypes = () => apiAction('get')(types.COMMON, services.sys + '/api/address-types', {}, true)

/**
 * degree
 */
export const getDegreeTypes = () => apiAction('get')(types.COMMON, services.sys + '/api/degree-types', {}, true)

/**
 * specializes 
 */
export const getSpecializes = () => apiAction('get')(types.COMMON, services.sys + '/api/specializes', {}, true)

/**
 * ranking
 */
export const getRankings = () => apiAction('get')(types.COMMON, services.sys + '/api/rankings', {}, true)

/**
 * income
 */
export const getIncomes = () => apiAction('get')(types.COMMON, services.sys + '/api/income-types', {}, true)

/**
 * relation ship
 */
export const getRelationShips = () => apiAction('get')(types.COMMON, services.sys + '/api/relations', {}, true)

/**
 * banks
 */
export const getBanks = () => apiAction('get')(types.COMMON, services.sys + '/api/banks', {}, true)
export const getBranches = () => apiAction('get')(types.COMMON, services.sys + '/api/bank-branches', {}, true)

/**
 * unit
 */
export const getUnits = () => apiAction('get')(types.COMMON, services.sys + '/api/units', {}, true)

/**
 * Type of agriculture
 */
export const getAgricultureTypes = () => apiAction('get')(types.COMMON, services.sys + '/api/master-data/cultivation-type', {}, true)

/**
 * Quanlity
 */
export const getQuanlities = () => apiAction('get')(types.COMMON, services.sys + '/api/master-data/quality-type', {}, true)

/**
 * Product Types
 */

export const getProductTypes = () => apiAction('get')(types.COMMON, services.sys + '/api/master-data/product-type', {}, true)

/**
 * Certification types
 */
export const getCertificationTypes = () => apiAction('get')(types.COMMON, services.sys + '/api/certification-types', {}, true)

/**
 * Literacy 
 */
export const getLiteracies = () => apiAction('get')(types.COMMON, services.sys + '/api/literacies', {}, true)

/**
 * professions
 */
export const getProfessions = () => apiAction('get')(types.COMMON, services.sys + '/api/professions', {}, true)

