import { USER_INPUT } from '../actions/actions_types';

const defaultState = {value: {}};

export default function (state = defaultState, action){
    switch (action) {
        case USER_INPUT:
            return { ...state, value: action.payload }
        default:
            return state;
    }
}
