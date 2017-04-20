import React from 'react'
import Paper from 'material-ui/Paper';
import LandingForm from './landing_form'

const style = {
  height: 300,
  width: 380,
  margin: '15% auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const PaperExampleSimple = () => (
    <Paper style={style} zDepth={4} >
        <LandingForm />
    </Paper>
);

export default PaperExampleSimple;