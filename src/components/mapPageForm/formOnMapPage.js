import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import Slider from 'material-ui/Slider';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import states from './states';
import majors from './majors';
import { searchForSchools } from '../../actions/actions_index';
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

const renderRadioGroup = ({ input, ...rest }) => (
    <RadioButtonGroup {...input} {...rest}
                      valueSelected={input.value}
                      onChange={(event, value) => input.onChange(value)}/>
);

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

    formSubmitted = (values) => {
        console.log("values", values);
        this.props.searchForSchools(values);
        this.props.clickClosed();
    };

    // clickClosed() {
    //     _this2.handleClose;
    // }

    render() {
        const { handleSubmit, reset } = this.props;
        const sliderStyle = {
            width: 230
        };
        const radioStyle = {
            display: 'inline-block',
            width: '138px'
        };

    return (
        <form className="extendedForm" onSubmit={handleSubmit((formValues)=>this.formSubmitted(formValues))}>
            <div>
                <Field name="location" component={renderTextField} label="City"/>
            </div>
            <div>
                <Field name="distanceSlider"
                       component={this.renderSlider}
                       defaultValue={40}
                       min={1}
                       max={300}
                       step={1}
                       style = {sliderStyle}
                />
            </div>
            <div>{'Type of Degree: '}</div>
            <div>
                <Field name="numOfYears" component={renderRadioGroup}>
                    <RadioButton style={radioStyle} value="aaDegree" label="AA Degree"/>
                    <RadioButton style={radioStyle} value="baDegree" label="BA Degree"/>
                </Field>
            </div>
            <div>{'School Type: '}</div>
            <div className="checkbox">
                <Field name="Public" component={renderCheckbox} label="Public" value="Public"/>
            </div>
            <div className="checkbox">
                <Field name="Private" component={renderCheckbox} label="Private" value="Private"/>
            </div>
            <div>
                <Field name="majors" component={renderSelectField} label="Majors">
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
                <RaisedButton label="Clear" style={style} type="button" onClick={reset}></RaisedButton>
            </div>
        </form>
    )};
};

mapPageForm = reduxForm({
    form: 'mapPageForm',  // a unique identifier for this form
})(mapPageForm)

export default connect(null, { searchForSchools })(mapPageForm);
