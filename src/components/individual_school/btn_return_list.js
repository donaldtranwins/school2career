import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

//creates button to go from individual schools page back to list of schools
const ReturnToListbtn = (props) => (
  <div>
    <RaisedButton
        label="Back to list"
        style={style}
        onTouchTap={() => props.onClick()}
    />
  </div>
);

export default ReturnToListbtn;
