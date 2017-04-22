import React from 'react';
import Paper from 'material-ui/Paper';

import SchoolList from './school_list';
import MainToolbar from './main_toolbar';


const style = {
  height: '100vh',
  width: '80vw',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const PaperExampleSimple = () => (
  <div>
    <Paper style={style} zDepth={0}>
        <MainToolbar/>
        <SchoolList/>
    </Paper>
  </div>
);

export default PaperExampleSimple;
