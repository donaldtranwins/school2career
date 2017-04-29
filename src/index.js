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
import NotFound from './components/notfoundpage/not_found'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blueGrey300, green300} from 'material-ui/styles/colors';


const createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore);
injectTapEventPlugin();

const muiTheme = getMuiTheme({
    // fontFamily: 'Roboto, sans-serif',
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
    top : 0,
    zIndex : -10
};

const paperForm = () => (
    <div>
        <img className="landingImg hidden-md-down mt-3" style={landingImage} src="images/college.jpg"/>
        <img className="landingImg hidden-lg-up mt-3" style={landingImage} src="images/flagler_college.png"/>
        <LandingFormPaper className='landingForm' />
    </div>
);

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={createStoreWithMiddleware(rootReducer)}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={paperForm}/>
                    <Route path="home" component={MainPage}/>
                    <Route path="school/:id" component={School}/>
                    <Route path="about" component={About}/>
                    <Route path="*" component={NotFound}/>
                </Route>
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);
