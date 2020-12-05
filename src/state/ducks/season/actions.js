import * as TYPES from "./types"
import seasonApi from "./api"


const getWeightUnit = (data) => {
    return {
        type: TYPES.GET_WEIGHT_UNIT,
        data
    }
}

export const getWeightUnitAction = () => {
    return async (dispatch) => {
        const rs = await seasonApi.getWeightUnit("/units", {
            type: 'MASS'
        });

        dispatch(getWeightUnit(rs.data));
    }
}

const getAreaUnit = (data) => {
    return {
        type: TYPES.GET_AREA_UNIT,
        data
    }
}

export const getAreaUnitAction = () => {
    return async (dispatch) => {
        const rs = await seasonApi.getAreaUnit("/units", {
            type: 'ACREAGE'
        });
        dispatch(getAreaUnit(rs.data))
    }
}
const getCertifycateOfLands = (data) => {
    return {
        type: TYPES.GET_CERTIFYCATE_OF_LANDS,
        data
    }
}
export const getCertifycateOfLandsAction = () => {
    return dispatch => {
        seasonApi.getCertifycateOfLands("/certifycate-of-lands")
            .then(response => {
                dispatch(getCertifycateOfLands(response.data))
            })
            .catch(err => {
                console.log('err: ', err);
            })
    }
}
const getAllFarms = (data) => {
    return {
        type: TYPES.GET_ALL_FARMS,
        data
    }
}
export const getAllFarmsAction = () => {
    return dispatch => {
        seasonApi.getAllFarms("/v1/farms")
            .then(response => {
                dispatch(getAllFarms(response.data))
            })
            .catch(err => {
                console.log('err: ', err);
            })
    }
}