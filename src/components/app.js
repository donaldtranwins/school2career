import React from 'react';

import AppBar from './app_bar';
// import MapPage from './mapPageForm/formOnMapPage';
import DrawerForm from './mapPageForm/formInDrawer'

const App = () => (
    <div>
        <AppBar/>
        {/*<MapPage/>*/}
        <DrawerForm/>
    </div>
);

export default App;
