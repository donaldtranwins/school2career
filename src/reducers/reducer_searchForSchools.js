import { FETCH_SCHOOLS } from '../actions/actions_types';

const defaultState = {all:[]};

export default function(state = defaultState, action){ // if undefined set to default_state
  switch(action.type){
    case FETCH_SCHOOLS:
      return { ...state, all: action.payload };
    default:
      return state;
  }
}
