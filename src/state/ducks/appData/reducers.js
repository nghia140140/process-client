import * as types from './types';
import produce from 'immer';

const initialState = {
	initData: null,
	locale: 'vn',
	cities: [],
	categories: [],
	genders: [],
	serviceProvides: [],
	serviceType: null,
	salerInfo: null,
	kolsTypes: []
};

const reducer = produce((draft, { payload, type }) => {
	switch (type) {
		case types.INIT_APP_DATA:
			draft.initData = 'success';
			return;
		case "authUser/LOGIN_SUCCESS":
			draft.locale = 'vn'
			return
		default:
			return draft;
	}
}, initialState);

export default reducer;
