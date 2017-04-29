import React from 'react';
import AppBar from './app_bar';

const App = (props) => (
    <div>
        <AppBar/>
        {props.children}
    </div>
);

export default App;
