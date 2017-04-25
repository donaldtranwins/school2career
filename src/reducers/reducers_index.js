import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import searchForSchoolsReducer from './reducer_searchForSchools';
import showMapReducer from './reducer_showmap';

const rootReducer = combineReducers({
    schools: searchForSchoolsReducer, //what you call it here is what you call it everywhere
    showMap: showMapReducer,
    form: formReducer
});

export default rootReducer;
