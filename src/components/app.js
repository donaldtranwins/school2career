import React from 'react';
import AppBar from './app_bar';

import LandingForm from './landing_form'
import LandingFormPaper from './landing_form_paper'

const App = () => (
    <div>
        <AppBar />
        <LandingFormPaper className='landingForm' />
    </div>
);

export default App;
