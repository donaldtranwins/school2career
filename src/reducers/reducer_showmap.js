import { SHOW_MAP } from '../actions/actions_types';

const defaultState = {showMap: true};
// reducer for whether the map is shown or not. Initially set to true.
export default function(state = defaultState, action){
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
