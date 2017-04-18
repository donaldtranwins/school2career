import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
   form: formReducer  //needs to change, was copied but not necessarily needed
});

export default rootReducer;