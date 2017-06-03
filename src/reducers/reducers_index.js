import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import searchForSchoolsReducer from './reducer_searchForSchools';
import showMapReducer from './reducer_showmap';
import mapCenter from './reducer_centermap';
import userInputReducer from './reducer_user_input';
import mapBoundsReducer from './reducer_map_bounds'
import schoolImage from './reducer_school_image';

//this sets the name for what these parts of state will be called in the various components
const rootReducer = combineReducers({
    schools: searchForSchoolsReducer,
    showMap: showMapReducer,
    center: mapCenter,
    form: formReducer,
    userInput: userInputReducer,
    mapBoundsInput: mapBoundsReducer,
    schoolImgURL: schoolImage
});

export default rootReducer;
