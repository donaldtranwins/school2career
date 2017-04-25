import { SHOW_MAP } from '../actions/actions_types';

const defaultState = {showMap: true};

export default function(state = defaultState, action){ // if undefined set to default_state
    console.log('action', action);
    switch(action.type){
        case SHOW_MAP:
            return {
                ...state,
                showMap: action.payload
            };
        default:
            return state;
    }
}

