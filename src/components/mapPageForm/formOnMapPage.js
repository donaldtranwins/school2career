import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';


import states from './states';
import DistanceSlider from './distance_slider';
import TuitionSlider from './tuition_slider';
import majors from './majors';


const style = {
    margin: 12,
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
    const { handleSubmit, reset } = props;

    return (
        <div>
        <form className="extendedForm" onSubmit={handleSubmit((formValues)=>formSubmitted(formValues))}>
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
                <Field name="distance" component={DistanceSlider} label="distance" >
                {/*<DistanceSlider />*/}
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
                <TuitionSlider />
            </div>

            <div>
                <RaisedButton label="Submit" style={style} type="submit" ></RaisedButton>
                <RaisedButton label="Clear" style={style} type="button" onClick={reset}></RaisedButton>
            </div>
        </form>
        </div>
    )
};

export default reduxForm({
    form: 'mapPageForm',  // a unique identifier for this form
})(mapPageForm)