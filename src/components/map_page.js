import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';

import states from './mapPageForm/states';
import DistanceSlider from './mapPageForm/distance_slider';
import TuitionSlider from './mapPageForm/tuition_slider';
import majors from './mapPageForm/majors';


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

const formSubmitted = (values) => {
  console.log(values)
};

// addTodoItem(values) {
//     console.log('e: ', values);
//
//     this.props.addTodo(values).then(() => {
//         this.context.router.push('/');
//     });
// }

const mapPageForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;

    const checkboxStyle = {
        width: 100
    };

    return (
        <form onSubmit={handleSubmit((formValues)=>formSubmitted(formValues))}>
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
                <DistanceSlider />
            </div>
            <div>
                <Field style={checkboxStyle} name="Public" component={renderCheckbox} label="Public" value="Public"/>
                <Field style={checkboxStyle} name="Private" component={renderCheckbox} label="Private" value="Private"/>
            </div>
            <div>
                <Field name="majors" component={renderSelectField} label="Majors">
                    {majors}
                </Field>
            </div>
            <div>
                <TuitionSlider />
            </div>

            <div>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
};

export default reduxForm({
    form: 'mapPageForm',  // a unique identifier for this form
})(mapPageForm)