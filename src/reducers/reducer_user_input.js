import { USER_INPUT } from '../actions/actions_types';

const defaultState = {value: null};

export default function (state = defaultState, action){
    switch (action.type) {
        case USER_INPUT:
            console.log('user input reducer: ', action.payload)
            return { ...state, value: action.payload }
        default:
            return state;
    }
}
