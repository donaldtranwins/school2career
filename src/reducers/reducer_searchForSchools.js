import { FETCH_SCHOOLS, ONE_SCHOOL } from '../actions/actions_types';

const defaultState = {
    all:[],
    single: null
};

export default function(state = defaultState, action){ // if undefined set to default_state
    console.log('actions:', action.payload);

    switch(action.type){
      case FETCH_SCHOOLS:
        return { ...state, all: action.payload.data.schools };
      case ONE_SCHOOL:
        return { ...state, single: action.payload.data.schools };

    default:
      return state;
  }
}
