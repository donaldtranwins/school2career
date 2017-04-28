import { SCHOOL_IMAGE } from '../actions/actions_types';

const defaultState = {image : ""};

export default function(state = defaultState, action){ // if undefined set to default_state
    switch(action.type){
        case SCHOOL_IMAGE:
            return { ...state, image: action.payload };
        default:
            return state;
    }
}