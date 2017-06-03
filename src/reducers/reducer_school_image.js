import { SCHOOL_IMAGE } from '../actions/actions_types';

const defaultState = {image : ""};

//reducer for the image retrieved from google places. initially it is set to nothing.
export default function(state = defaultState, action){
    switch(action.type){
        case SCHOOL_IMAGE:
            return { ...state, image: action.payload };
        default:
            return state;
    }
}
