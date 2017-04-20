import { FETCH_SCHOOLS } from '../actions/actions_types';

const defaultState = {all:[]};

export default function(state = defaultState, action){ // if undefined set to default_state
  switch(action.type){
    case FETCH_SCHOOLS:
      console.log('fetch schools in reducer: ', action.type);
      console.log('reducer: ', action.payload);
      return { ...state, all: action.payload };
    default:
      return state;
  }
}
