import React from 'react';
import AppBar from './app_bar';
// import MapPage from './mapPageForm/formOnMapPage';
import DrawerForm from './mapPageForm/formInDrawer'

import LandingForm from './landing_form/landing_form'
import LandingFormPaper from './landing_form/landing_form_paper'

const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const App = () => (
    <div className='bgImage'>
        <AppBar />
        {/*<MapPage/>*/}
        <DrawerForm/>
        <LandingFormPaper style={style} className='landingForm' />
    </div>
);

export default App;
