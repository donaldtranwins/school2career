import React from 'react';
import Paper from 'material-ui/Paper';
import SchoolList from './school_list';

const style = {
  height: '100vh',
  width: '80vw',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};
//creates a paper with the list of schools for the school search page
const PaperExampleSimple = () => (
  <div>
    <Paper style={style} zDepth={0}>
        <SchoolList/>
    </Paper>
  </div>
);

export default PaperExampleSimple;
