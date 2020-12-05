import axios from 'axios';
import queryString from "query-string";
import { authActions } from "~/state/ducks/authUser";
import store from "../store";
import { removeAuthoz, getAuthoz } from '~/state/utils/session';


const axiosClient = axios.create({
    baseURL: `${process.env.DOMAIN}/services/sys/api`,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    // removeAuthoz();
    const customHeaders = {};
    const token = getAuthoz();
    if (token) {
        customHeaders.Authorization = `Bearer ${token}`
    }
    // console.log('token', token);
    // console.log('config: ', {
    //     ...config,
    //     headers: { ...customHeaders, ...config.headers }
    // });

    return {
        ...config,
        headers: { ...customHeaders, ...config.headers }
    };
}, (error) => {
    return Promise.reject(error);
})

axiosClient.interceptors.response.use((response) => {
    console.log('response: ', response);

    return response;
}, (error) => {

    const { response: { status, statusText } } = error;
    if (status === 401) {
        store.dispatch(authActions.logout())
    }
    return Promise.reject(error);
})

export default axiosClient;