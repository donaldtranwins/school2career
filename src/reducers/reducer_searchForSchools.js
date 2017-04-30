import { FETCH_SCHOOLS, ONE_SCHOOL } from '../actions/actions_types';

const defaultState = {
    all:[],
    single: null
};

export default function(state = defaultState, action){ // if undefined set to default_state
  switch(action.type){

      case FETCH_SCHOOLS:
          console.log('all schools action payload: ', action.payload.data.schools);
        return { ...state, all: action.payload };
      case ONE_SCHOOL:
        return { ...state, single: action.payload.data.schools };

    default:
      return state;
  }
}


