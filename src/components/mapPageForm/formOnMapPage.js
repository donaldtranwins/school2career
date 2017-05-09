import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import Slider from 'material-ui/Slider';
import { geocodeByAddress } from 'react-places-autocomplete';
import majors from '../landing_form/majors';
import { searchForSchools, centerOfMap, userInput, showLoader } from '../../actions/actions_index';
import GeoCode from '../geocoding/geocoding';

const style = {
    margin: 12
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
const renderCheckbox = ({ input, label }) => (
    <Checkbox label={label}
              checked={input.value ? true : false}
              onCheck={input.onChange}/>
);
const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
    <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}/>
);
class mapPageForm extends Component {

    constructor(props) {
        super(props);
    }
    renderSlider({input: {onChange, value, name}, defaultValue, min, max}){
        if(!value){
            defaultValue = defaultValue || min;
            onChange(defaultValue);
        }
        if (name === "distanceSlider") {
            return (
                <div>Distance: {value} miles
                    <Slider name={name} onChange={(props, val) => onChange(val, props)} defaultValue={defaultValue}
                            min={min} max={max}/>
                </div>
            )
        } else {
            return (
                <div>Tuition: ${value}
                    <Slider name={name} onChange={(props, val) => onChange(val, props)} defaultValue={defaultValue}
                            min={min} max={max}/>
                </div>
            )
        }
    }
    getCenterCoords = (values) => {
        const center = {
            lat: values.latLng.lat,
            lng: values.latLng.lng
        };
        this.props.userInput(values);
        this.props.centerOfMap(center);
    };
    formSubmitted(values) {
        geocodeByAddress(values.location, (err, latLng) => {
            if(err) { console.warn('error: ', err)}
            values.latLng = latLng;
            this.getCenterCoords(values);
        });
        let bounds =  this.props.mapB.mapBoundsInput.mapBounds;
        let latLng = this.props.mapB;
        this.props.showLoader(true);
        console.log('formSubmitted', latLng);
        if(values.location === this.props.input.value.location && this.props.mapB.mapBoundsInput.mapBounds.ne !== undefined){
            values.mapBounds = bounds;
            values.latLng = this.props.input.value.latLng;
            console.log('Form calling get schools IF');
            this.props.clickClosed();
            this.props.searchForSchools(values);

        } else {
            console.log('Form calling get schools ELSE');
            // this.props.searchForSchools(values);
            this.props.clickClosed();
        }
    };
    handleKeyPress = (event) => {
      if(event.key == 'Enter'){

      }
    };
    render() {
        const { handleSubmit } = this.props;
        const sliderStyle = {
            width: 200,
            height: 4
        };
    return (
        <form onKeyDown={this.handleKeyPress} className="locationName extendedForm" onSubmit={handleSubmit((formValues)=>this.formSubmitted(formValues))}>
            <div className="locationArea">
                <Field name="location" component={renderTextField} label="LOCATION"/>
            </div>
            <div>{'Type of Degree: '}</div>
            <div className="checkboxDeg">
                <Field name="aa" component={renderCheckbox} defaultChecked={false} label="Associates Degree" value="2"/>
            </div>
            <div className="checkboxDeg">
                <Field name="bs" component={renderCheckbox} label="Bachelors Degree" value="4"/>
            </div>
            <div className="checkboxDeg">
                <Field name="voc" component={renderCheckbox} label="Vocational" value="voc"/>
            </div>
            <div>{'School Type: '}</div>
            <div className="checkbox">
                <Field name="public" component={renderCheckbox} label="Public" value="Public"/>
            </div>
            <div className="checkbox">
                <Field name="private" component={renderCheckbox} label="Private" value="Private"/>
            </div>
            <div>
                <Field onKeyDown={this.handleKeyPress} name="pickAMajor" component={renderSelectField} label="Majors">
                    {majors}
                </Field>
            </div>
            <div>
                <Field name="tuitionSlider"
                       component={this.renderSlider}
                       defaultValue={50000}
                       min={1}
                       max={80000}
                       step={1000}
                       style = {sliderStyle}
                />
            </div>
            <div>
                <RaisedButton label="Submit" style={style} type="submit" />
            </div>
        </form>
    )};
};

mapPageForm = reduxForm({
    form: 'mapPageForm',  // a unique identifier for this form]
    validate,
    initialValues: {aa: true, bs: true, voc: true, public: true, private: true}
})(mapPageForm);

function mapStateToProps(state){
    return {
        input: state.userInput,
        mapB: state.mapBoundsInput
    }
}

// function mapStateToProps(state) {
//         let thisLocation = state.userInput.value.location;
//         let major = state.userInput.value.pickAMajor;
//
//     return {
//         initialValues: {
//             location: thisLocation,
//             aa: true, bs: true, voc: true, public: true, private: true,
//             pickAMajor: major
//         }
//     };
// }

export default connect(mapStateToProps, { searchForSchools, centerOfMap, userInput, showLoader })(mapPageForm );
