import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import Slider from 'material-ui/Slider';

import states from './states';
import majors from './majors';
import { searchForSchools } from '../../actions/actions_index'



const style = {
    margin: 12
};

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField hintText={label}
               floatingLabelText={label}
               errorText={touched && error}
               {...input}
               {...custom}
    />
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

    renderSlider({input: {onChange, value}, name, defaultValue, min, max}){

        if(!value){
            defaultValue = defaultValue || min;
            onChange(defaultValue);
        }

        return <Slider name={name} onChange={(props, val) => onChange(val, props)} defaultValue={defaultValue} min={min} max={max}/>
    }

    formSubmitted = (values) => {
        this.props.searchForSchools(values);
        console.log(values)
    };

    render() {
        const { handleSubmit, reset } = this.props;
        const sliderStyle = {
            width: 250
        };

    return (

        <form className="extendedForm" onSubmit={handleSubmit((formValues)=>this.formSubmitted(formValues))}>
            <div>
                <Field name="zipCode" component={renderTextField} label="Zip Code"/>
            </div>
            <div>
                <Field name="city" component={renderTextField} label="City"/>
            </div>
            <div>
                <Field name="state" component={renderSelectField} label="State">
                    {states}
                </Field>
            </div>
            <div>
                <div>Distance:</div>
                <Field name="distanceSlider"
                       component={this.renderSlider}
                       defaultValue={40}
                       min={0}
                       max={300}
                       step={1}
                       style = {sliderStyle}
                />
                {/*<DistanceSlider />*/}
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
                <div>Tuition:</div>
                <Field name="tuitionSlider"
                       component={this.renderSlider}
                       defaultValue={10000}
                       min={0}
                       max={80000}
                       step={1000}
                       style = {sliderStyle}
                />
                {/*<TuitionSlider />*/}
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