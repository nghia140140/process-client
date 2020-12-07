import * as TYPES from "./types"

const initalState = {
    farms: [],
    weightUnit: [],
    areaUnit: [],
    certifycateOfLands: [],
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case TYPES.GET_ALL_FARMS:
            return { ...state, farms: action.data }
        case TYPES.GET_WEIGHT_UNIT:
            return { ...state, weightUnit: action.data }
        case TYPES.GET_AREA_UNIT:
            return { ...state, areaUnit: action.data }
        case TYPES.GET_CERTIFYCATE_OF_LANDS:
            return { ...state, certifycateOfLands: action.data }
        case TYPES.ADD_FARMSEASION:
            return state;
        default:
            return state;
    }
}

export default reducer