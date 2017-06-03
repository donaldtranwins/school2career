import { FETCH_SCHOOLS, ONE_SCHOOL, SHOW_LOADER } from '../actions/actions_types';

const defaultState = {
    all:[],
    single: null,
    noSchool: false,
    showLoader: false
};
//reducer for getting all schools, getting one school and for showing the loader, also handles no schools.
export default function(state = defaultState, action){
    switch(action.type){
        case FETCH_SCHOOLS:
            return { ...state, all: action.payload.data.schools, noSchool: action.payload.data.errors, showLoader: false };
        case ONE_SCHOOL:
            return { ...state, single: action.payload.data, noSchool: action.payload.data.errors, showLoader: false };
        case SHOW_LOADER:
            return {...state, showLoader: true, all: [] };
        default:
            return state;
  }
}
