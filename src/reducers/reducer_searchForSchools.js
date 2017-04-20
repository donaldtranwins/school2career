import { FETCH_SCHOOLS } from '../actions/actions_types';

const defaultState = {all:[]}

export default function(state = defaultState, action){ // if undfined set to defalut_state
  switch(action.type){
    case FETCH_SCHOOLS:
      console.log('fetch schools action: ', action.type);
      return { ...state, all: action.payload.cityName };
    default:
      return state;
  }
}
