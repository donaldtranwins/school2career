import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import searchForSchoolsReducer from './reducer_searchForSchools';
import showMapReducer from './reducer_showmap';
import mapCenter from './reducer_centermap';
import userInputReducer from './reducer_user_input';
import mapBoundsReducer from './reducer_map_bounds'

const rootReducer = combineReducers({
    schools: searchForSchoolsReducer, //what you call it here is what you call it everywhere
    showMap: showMapReducer,
    center: mapCenter,
    form: formReducer,
    userInput: userInputReducer,
    mapBoundsInput: mapBoundsReducer
});

export default rootReducer;
