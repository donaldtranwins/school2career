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
import rootReducer from './reducers/reducers_index';
import LandingFormPaper from './components/landing_form/landing_form_paper';

const createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore);
injectTapEventPlugin();


const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const paperForm = () => (
    <div className="bgImage">
        <LandingFormPaper style={style} className='landingForm' />
    </div>
);

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={createStoreWithMiddleware(rootReducer)}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={paperForm}/>
                    <Route path="home" component={MainPage}/>
                    {/*<Route path="school/:id" component={School}/>*/}
                    {/*<Route path="about" component={About}/>*/}
                </Route>
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);
