import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';

const style = {
  margin: 12,
};

const ReturnToListbtn = () => (
  <div>
    <RaisedButton
      icon={<ActionAndroid />}
      style={style}
    />
  </div>
);

export default ReturnToListbtn;
