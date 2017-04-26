import axios from 'axios';

import { FETCH_SCHOOLS, SHOW_MAP } from './actions_types';

const BASE_URL = 'http://54.213.197.41/api/school/data.php?action=getData';
const API_KEY = '';

export function searchForSchools(value) {
    const request = axios.post(`${BASE_URL}`);
    return {
        type: FETCH_SCHOOLS,
        payload: request
    };
}


export function toggleMap(value) {
    console.log('value', !value);

    return {
        type: SHOW_MAP,
        payload: !value  //may change back to ternary value ? false : true
    }
}
