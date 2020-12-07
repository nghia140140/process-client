import * as TYPES from "./types";
import seasonApi from "./api";
import apiAction, { defaultAction } from '../utils/createAction';


export const addSeason = (body) => apiAction('post')(TYPES.ADD_FARMSEASION, '/api/farming-seasons/create', body, false);


// const URL = "https://tutofox.com/foodapp/api.json";
// export const getTemp = () => {
//   return fetch(URL)
//     .then((res) => res.json())
//     .then((resJSON) => resJSON.banner);
// };
// const URLADDSEASON = "http://d5ea35a6a48c.ngrok.io/api/season-processes/create"
// export const addSeason = () => {
//   return fetch(URLADDSEASON, {
//     method: "POST",
//     headers: {
//       Accept: "application/json, text/plain",
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//     body: JSON.stringify({
//       name: "Season Process 1",
//       note: "Note Season Process",
//       description: "Description Season Process",
//       stepsNumber: 3,
//       interval: 3,
//       status: "WAITING",
//       startDate: "2020-12-17T00:00:00.000Z",
//       endDate: "2021-02-17T00:00:00.000Z",
//       ratings: "EXCELLENT",
//       steps: [
//         {
//           name: "Season Process Step 1",
//           description: "Description Season Process Step",
//           startDate: "2020-12-19T00:00:00.000Z",
//           endDate: "2021-01-01T00:00:00.000Z",
//           interval: 3,
//           afterDays: 3,
//           startHour: 3,
//           status: "ACTIVATED",
//           note: "Note Season Process Step",
//         },
//         {
//           name: "Season Process Step 1",
//           description: "Description Season Process Step",
//           startDate: "2020-12-19T00:00:00.000Z",
//           endDate: "2021-01-01T00:00:00.000Z",
//           interval: 3,
//           afterDays: 3,
//           startHour: 3,
//           status: "ACTIVATED",
//           note: "Note Season Process Step",
//         },
//       ],
//     }),
//   })
//     .then((res) => res.json())
//     .then((resJSON) => resJSON.data);
// };

const getWeightUnit = (data) => {
  return {
    type: TYPES.GET_WEIGHT_UNIT,
    data,
  };
};

export const getWeightUnitAction = () => {
  return async (dispatch) => {
    const rs = await seasonApi.getWeightUnit("/units", {
      type: "MASS",
    });

    dispatch(getWeightUnit(rs.data));
  };
};

const getAreaUnit = (data) => {
  return {
    type: TYPES.GET_AREA_UNIT,
    data,
  };
};

export const getAreaUnitAction = () => {
  return async (dispatch) => {
    const rs = await seasonApi.getAreaUnit("/units", {
      type: "ACREAGE",
    });
    dispatch(getAreaUnit(rs.data));
  };
};
const getCertifycateOfLands = (data) => {
  return {
    type: TYPES.GET_CERTIFYCATE_OF_LANDS,
    data,
  };
};
export const getCertifycateOfLandsAction = () => {
  return (dispatch) => {
    seasonApi
      .getCertifycateOfLands("/certifycate-of-lands")
      .then((response) => {
        dispatch(getCertifycateOfLands(response.data));
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
};
const getAllFarms = (data) => {
  return {
    type: TYPES.GET_ALL_FARMS,
    data,
  };
};
export const getAllFarmsAction = () => {
  return (dispatch) => {
    seasonApi
      .getAllFarms("/v1/farms")
      .then((response) => {
        dispatch(getAllFarms(response.data));
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
};
