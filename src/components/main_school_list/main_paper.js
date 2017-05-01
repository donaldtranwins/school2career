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

const PaperExampleSimple = () => (
  <div>
    <Paper style={style} zDepth={0}>
        <SchoolList/>
    </Paper>
  </div>
);

export default PaperExampleSimple;
