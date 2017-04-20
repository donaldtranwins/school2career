import axios from 'axios';

import { FETCH_SCHOOLS } from './actions_types';

const BASE_URL = 'http://54.213.197.41/api/school/data.php?action=getData';
const API_KEY = '';

export function searchForSchools(value) {
    console.log('action: ', value)
    const request = axios.post(`${BASE_URL}`);
    return {
        type: FETCH_SCHOOLS,
        payload: request
    };
}
