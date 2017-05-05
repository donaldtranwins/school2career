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
import { searchForSchools, centerOfMap, userInput } from '../../actions/actions_index';
import GeoCode from '../geocoding/geocoding';

const style = {
    margin: 12
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
    formSubmitted = (values) => {
        geocodeByAddress(values.location, (err, latLng) => {
            if(err) { console.warn('error: ', err)}
            values.latLng = latLng;
            this.getCenterCoords(values);
        });
        this.props.searchForSchools(values);
        this.props.clickClosed();
    };
    render() {
        const { handleSubmit } = this.props;
        const sliderStyle = {
            width: 200,
            height: 4,
            backgroundColor: 'red'
        };
        const locationName = this.props.userInput.location;
        const majorName = this.props.userInput.pickAMajor;
    return (
        <form className="locationName" onSubmit={handleSubmit((formValues)=>this.formSubmitted(formValues))}>
            <div className="locationArea">
                <Field name="location" component={renderTextField} label="City"/>
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
                <Field name="pickAMajor" component={renderSelectField} label="Majors">
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
                <RaisedButton label="Submit" style={style} type="submit" ></RaisedButton>
            </div>
        </form>
    )};
};

mapPageForm = reduxForm({
    form: 'mapPageForm',  // a unique identifier for this form
    initialValues: {aa: true, bs: true, voc: true, public: true, private: true}
})(mapPageForm);

function mapStateToProps(state) {
    return {
        userInput : state.userInput.value
    };
}

export default connect(mapStateToProps, { searchForSchools, centerOfMap, userInput })(mapPageForm );
