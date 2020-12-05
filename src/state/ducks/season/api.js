import axiosClient from "~/state/utilities/axiosClient"
const DOMAIN_CLIENT = "http://192.168.1.24:8180";

const seasonApi = {
    getWeightUnit: (url, params = {}) => {
        return axiosClient.get(url, { params })
    },
    getAreaUnit: (url, params = {}) => {
        return axiosClient.get(url, { params })
    },
    getCertifycateOfLands: (url, params = {}) => {
        return axiosClient.get(url, { params })
    },
    getAllFarms: (url, params = {}) => {
        return axiosClient.get(url, { params })
    },
    getProducts: (url, params = {}) => {
        return axiosClient.get(url, {
            baseURL: `${DOMAIN_CLIENT}/services/sys/api`,
            params
        })
    }
}

export default seasonApi