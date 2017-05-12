import { SCHOOL_IMAGE } from '../actions/actions_types';

const defaultState = {image : ""};

export default function(state = defaultState, action){
    switch(action.type){
        case SCHOOL_IMAGE:
            return { ...state, image: action.payload };
        default:
            return state;
    }
}
