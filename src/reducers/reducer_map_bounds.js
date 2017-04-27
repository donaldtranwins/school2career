import { MAP_BOUNDS_INPUT } from '../actions/actions_types';

const defaultState = { mapBoundsInput: null };

export default function (state = defaultState, action){
    switch (action.type) {
        case MAP_BOUNDS_INPUT:
            return { ...state, mapBoundsInput: action.payload }
        default:
            return state;
    }
}
