import { FETCH_SCHOOLS, ONE_SCHOOL, SHOW_LOADER } from '../actions/actions_types';

const defaultState = {
    all:[],
    single: null,
    noSchool: false,
    showLoader: false
};

export default function(state = defaultState, action){ // if undefined set to default_state
    console.log('action payload: ', action.payload)
    switch(action.type){
        case FETCH_SCHOOLS:
            return { ...state, all: action.payload.data.schools, noSchool: action.payload.data.errors, showLoader: false };
        case ONE_SCHOOL:
            return { ...state, single: action.payload.data, noSchool: action.payload.data.errors, showLoader: false };
        case SHOW_LOADER:
            return {...state, showLoader: true };
        default:
            return state;
  }
}
