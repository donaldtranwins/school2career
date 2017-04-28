import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import searchForSchoolsReducer from './reducer_searchForSchools';
import showMapReducer from './reducer_showmap';
import mapCenter from './reducer_centermap';
import userInputReducer from './reducer_user_input';
import mapBoundsReducer from './reducer_map_bounds'
// import userInput from './reducer_user_input';
import schoolImage from './reducer_school_image';


const rootReducer = combineReducers({
    schools: searchForSchoolsReducer, //what you call it here is what you call it everywhere
    showMap: showMapReducer,
    center: mapCenter,
    form: formReducer,
    userInput: userInputReducer,
    mapBoundsInput: mapBoundsReducer,
//     userInput: userInput,
    schoolImgURL: schoolImage
});

export default rootReducer;
