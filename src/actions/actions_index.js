import axios from 'axios';

import { FETCH_SCHOOLS } from './actions_types';

const BASE_URL = '';
const API_KEY = '';

export function searchForSchools(value) {
    console.log('action: ', value)

    const request = {
        schoolName: 'UCLA'
    }

    //axios.get(`${BASE_URL}${API_KEY}`);
    return {
        type: FETCH_SCHOOLS,
        payload: request
    };
};
