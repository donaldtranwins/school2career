import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { geocodeByAddress } from 'react-places-autocomplete';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

import majors from './majors';
import { searchForSchools, centerOfMap } from '../../actions/actions_index';
import GeoCode from '../geocoding/geocoding';

const btnStyle = {
    margin: 12,
    textAlign: 'center',
};
const selectStyle = {
    textAlign: 'none'
};

const renderTextField = ({ input: { onChange, name }, label, meta: { touched, error }, ...custom }) => {
    return (
        <GeoCode hintText={label}
            floatingLabelText={label}
            errorText={touched && error}
            onChange={ val => {
                onChange(val);
            }}
            name={name}
            {...custom}
        />
    )
};
const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
    <SelectField
    className='landingForm'
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => {
        input.onChange(value)
    }}
    children={children}
    {...custom}/>
);
class LandingForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    getCenterCoords = (values) => {
        debugger;
        console.log('values', values);
        const center = {
            lng: values.latLng.lng,
            lat: values.latLng.lat
        };
        this.props.centerOfMap(center);
    };
    formSubmitted = (values) => {
        geocodeByAddress(values.location,  (err, latLng) => {
          console.log("formSubmitted values", values);

        if (err) { console.warn('error', err) }
        values.latLng = latLng;
        this.getCenterCoords(values);
      });

    this.props.searchForSchools(values).then(() => {this.context.router.push('/home')});
    };
    render(){
        const { handleSubmit, pristine, reset, submitting } = this.props
        return (
          <form onSubmit={handleSubmit((formValues) => this.formSubmitted(formValues))}>
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
  form: 'LandingForm',
})(LandingForm)

export default connect(null, { searchForSchools, centerOfMap })(LandingForm);
