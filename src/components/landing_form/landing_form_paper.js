import React from 'react';
import Paper from 'material-ui/Paper';
import LandingForm from './landing_form'

const style = {
    height: 300,
    width: 380,
    margin: '0 auto',
    marginTop: '16%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};
//creates the paper with the landing form already made inside of it.
const PaperExampleSimple = () => (
    <Paper style={style} zDepth={4} >
        <LandingForm />
    </Paper>
);

export default PaperExampleSimple;
