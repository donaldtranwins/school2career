import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';

import { FETCH_SCHOOLS, ONE_SCHOOL, SHOW_MAP, CENTER_COORDS, USER_INPUT, SCHOOL_IMAGE, MAP_BOUNDS_INPUT, SHOW_LOADER } from './actions_types';

const BASE_URL = 'http://dev.school2career.net/fetch_schools';
const ONESCHOOL_URL = 'http://dev.school2career.net/one_school/id/';

export function searchForSchools(value) {
    value.newInfo=true;
    const newVal = JSON.stringify(value);
    const request = axios.post(`${BASE_URL}`, newVal)
    return {
        type: FETCH_SCHOOLS,
        payload: request
    };
}

export function searchOneSchool(value) {
    const request = axios.post(`${ONESCHOOL_URL}`+value);
    return {
        type: ONE_SCHOOL,
        payload: request
    }
}

export function showLoader(value) {
    return {
        type: SHOW_LOADER,
        payload: value
    }
}

export function centerOfMap(value) {
    return {
        type: CENTER_COORDS,
        payload: value
    }
}

export function schoolURL(value) {
    return {
        type: SCHOOL_IMAGE,
        payload: value
    }
}

export function toggleMap(value) {
    return {
        type: SHOW_MAP,
        payload: !value
    }
}

export function userInput(value){
    return {
        type: USER_INPUT,
        payload: value
    }
}

export function mapBoundsInput(value){
    return {
        type: MAP_BOUNDS_INPUT,
        payload: value
    }
}
