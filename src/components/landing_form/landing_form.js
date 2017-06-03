import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { geocodeByAddress } from 'react-places-autocomplete';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import majors from './majors';
import { searchForSchools, centerOfMap, userInput, showLoader } from '../../actions/actions_index';
import GeoCode from '../geocoding/geocoding';

const btnStyle = {
    margin: 12,
    marginLeft: '85px',
    // marginRight: 30,
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
//creates a text field
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
//creates a select field
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
    //allows for routing to change to school search page
    static contextTypes = {
        router: PropTypes.object
    };
    // gets the coordinates for the map, sets the center location and user input
    getCenterCoords = (values) => {
        const center = {
            lng: values.latLng.lng,
            lat: values.latLng.lat
        };
        this.props.centerOfMap(center);
        this.props.userInput(values);
    };
    //when form is submitted, the loader gets set and geocoding occurs and page is pushed to school search
    formSubmitted = (values) => {
        this.props.showLoader(true);
        geocodeByAddress(values.location,  (err, latLng) => {
            if (err) { console.warn('error', err) }
            values.latLng = latLng;
            this.getCenterCoords(values);
            this.context.router.push('/school_search');
        });
    };
    //returns the form that will appear on landing page
    render(){
        const { handleSubmit, pristine, submitting } = this.props;
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
            </div>
          </form>
        )
    }
}
//uses redux form to create the form
LandingForm = reduxForm({
    form: 'LandingForm',
    validate
})(LandingForm);
//connects several action creators to be used in this component. Null is used as mapstatetoprops is not needed
export default connect(null, { searchForSchools, centerOfMap, userInput, showLoader })(LandingForm);
