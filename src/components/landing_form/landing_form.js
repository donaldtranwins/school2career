import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

import majors from './majors';
import { searchForSchools } from '../../actions/actions_index'

const btnStyle = {
    margin: 12,
    textAlign: 'center',
};
const selectStyle = {
    textAlign: 'none'
}

const validate = values => {
  const errors = {}
  // const requiredFields = [ 'firstName', 'lastName', 'email', 'favoriteColor', 'notes' ]
  // requiredFields.forEach(field => {
  //   if (!values[ field ]) {
  //     errors[ field ] = 'Required'
  //   }
  // })
  // if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Invalid email address'
  // }
  return errors
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)
const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => {
        input.onChange(value)
    }}
    children={children}
    {...custom}/>
)

class LandingForm extends Component {
    formSumbitted = (values) => {
        this.props.searchForSchools(values);
        console.log(values)
    }

    render(){
        const { handleSubmit, pristine, reset, submitting } = this.props
        return (
          <form onSubmit={handleSubmit((formValues) => this.formSumbitted(formValues))}>
            <div>
              <Field name="location" component={renderTextField} label="LOCATION"/>
            </div>
            <div>
                <Field name="pickAMajor" style={selectStyle} component={renderSelectField} label="PICK A MAJOR">
                    {majors}
                </Field>
            </div>
            <div>
              <RaisedButton label="Submit" style={btnStyle} type="submit" disabled={pristine || submitting}></RaisedButton>
              <RaisedButton label="Clear" style={btnStyle} type="button" disabled={pristine || submitting} onClick={reset}></RaisedButton>
            </div>
          </form>
        )
    }
}
LandingForm = reduxForm({
  form: 'LandingForm',  // a unique identifier for this form
  validate: validate
  // asyncValidate
})(LandingForm)

export default connect(null, { searchForSchools })(LandingForm);
