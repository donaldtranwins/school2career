import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { geocodeByAddress } from 'react-places-autocomplete';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import majors from './majors';
import { searchForSchools, centerOfMap, userInput, showLoader } from '../../actions/actions_index';
import GeoCode from '../geocoding/geocoding';

const btnStyle = {
    margin: 12,
    textAlign: 'center',
};
const selectStyle = {
    textAlign: 'none'
};

const validate = values => {
    const errors = {};
    if (!values.location) {
        errors.location = 'Required';
    }
    return errors
};

const renderTextField = ({ input: { onChange, name }, label, meta: { touched, error }, ...custom }) => {
    return (
        <div>
            <GeoCode hintText={label}
                floatingLabelText={label}
                onChange={ val => {
                    onChange(val);
                }}
                name={name}
                {...custom}
            />
            <div>
            {touched && (error && <span className="required">{error}</span>)}
            </div>
        </div>
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
        const center = {
            lng: values.latLng.lng,
            lat: values.latLng.lat
        };
        this.props.centerOfMap(center);
        this.props.userInput(values);
    };
    formSubmitted = (values) => {
        this.props.showLoader(true);
        geocodeByAddress(values.location,  (err, latLng) => {
        if (err) { console.warn('error', err) };
        values.latLng = latLng;
        this.getCenterCoords(values);
        this.context.router.push('/school_search');
      });
    };
    render(){
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
          <form onSubmit={handleSubmit((formValues) => this.formSubmitted(formValues))}>
            <div>
              <Field name="location" component={renderTextField} label="LOCATION">
                {  <span >errorText</span> }
                </Field>
            </div>
            <div>
                <Field name="pickAMajor" style={selectStyle} component={renderSelectField} label="PICK A MAJOR">
                    {majors}
                </Field>
            </div>
            <div>
              <RaisedButton label="Submit" style={btnStyle} type="submit" disabled={pristine || submitting }/>
              <RaisedButton label="Clear" style={btnStyle} type="button" disabled={pristine || submitting} onClick={reset}/>
            </div>
          </form>
        )
    }
}
LandingForm = reduxForm({
  form: 'LandingForm',
    validate
})(LandingForm);

export default connect(null, { searchForSchools, centerOfMap, userInput, showLoader })(LandingForm);
