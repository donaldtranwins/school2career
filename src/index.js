import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxPromise from 'redux-promise';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/app';
import rootReducer from './reducers/reducers_index'


const createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore);
injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={createStoreWithMiddleware(rootReducer)}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                </Route>
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);
