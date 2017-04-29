import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';

import { FETCH_SCHOOLS, ONE_SCHOOL, SHOW_MAP, CENTER_COORDS, USER_INPUT, SCHOOL_IMAGE, MAP_BOUNDS_INPUT } from './actions_types';


// const BASE_URL = 'http://dev.ninojoseph.com/api/request.php';
const BASE_URL = 'http://ninojoseph.com/api/school/data.php?action=getData';
const ONESCHOOL_URL = 'http://ninojoseph.com/api/school/data.php?action=getDataOne';
const API_KEY = '';

export function searchForSchools(value) {
    console.log('value', value);
    const newVal = JSON.stringify(value);
    console.log('newValue',newVal);
    const request = axios.post(`${BASE_URL}`, newVal);
    return {
        type: FETCH_SCHOOLS,
        payload: request
    };
}

export function searchOneSchool(value) {
    const request = axios.post(`${ONESCHOOL_URL}`);
    return {
        type: ONE_SCHOOL,
        payload: request
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
        payload: !value  //may change back to ternary value ? false : true
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
