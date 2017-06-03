import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxPromise from 'redux-promise';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/app';
import MainPage from './components/main_page';
import School from './components/individual_school/individual_school';
import About from './components/about_us/about';
import rootReducer from './reducers/reducers_index';
import LandingFormPaper from './components/landing_form/landing_form_paper';
import NotFound from './components/notfoundpage/not_found';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blueGrey300, green300} from 'material-ui/styles/colors';

const createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore);
injectTapEventPlugin();


//changed theme for Material UI
const muiTheme = getMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
        textColor: blueGrey300,
        primary1Color: green300,
    },
    appBar: {
        height: 50,
    },
});

const landingImage = {
    position : 'absolute',
    width: '100%',
    height: '100vh',
    top : 0,
    zIndex : -10
};

//created the landing page, this shows the images based on size screen as well as adds the form for choosing
// location and majors
const PaperForm = () => (
    <div>
        <div className='landingImg'></div>
        <img className="landingImg hidden-sm-down mt-3" style={landingImage} src="images/washingtonstate.jpg"/>
        <img className="landingImg hidden-md-up mt-3" style={landingImage} src="images/flagler_college.png"/>
        <LandingFormPaper className='landingForm' />
    </div>
);

//sets up the Material UI theme as well as creates the routes (ie paths for the navigation)
//:id is a wild card that matches the ID of the school so every school will have it's own route based on it's id number
//the * grabs everything not defined and will show off the 404 page.
//using indexroute allows the / to have a default child for the app component, ie giving us a home page with just the /
ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={createStoreWithMiddleware(rootReducer)}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={PaperForm}/>
                    <Route path="school_search" component={MainPage}/>
                    <Route path="school/:id" component={School}/>
                    <Route path="about" component={About}/>
                    <Route path="*" component={NotFound}/>
                </Route>
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);