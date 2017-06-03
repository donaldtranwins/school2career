import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import {green300} from 'material-ui/styles/colors';

class DegreeList extends Component{

    render () {
        const styles = {
            backgroundColor : green300,
            color: 'white'
        };
        //creates an array of all the degrees offered in a school
        const degrees = this.props.school.single.school.programs.map(function(obj){
            let degreeInfo = "";
            if (obj.associates !== 0 || obj.bachelors !== 0) {
                if (obj.associates == 1) {
                    degreeInfo += 'Associates, '
                } else if (obj.associates == 2) {
                    degreeInfo += 'Associates (distance only),'
                }
                if (obj.bachelors == 1) {
                    degreeInfo += ' Bachelors,'
                } else if (obj.bachelors == 2) {
                    degreeInfo += ' Bachelors (distance only),'
                }
                degreeInfo += ' offered in ' + obj.name;
                return <div key={obj.name}>{degreeInfo}</div>
            } else {
                return <div key={obj.name}>Certificate offered in {obj.name}</div>
            }
        });
        //returns a div that contains all the degrees styled for the individual schools page
        return (
            <div>
                <h4 className="degreeList">Degrees Offered</h4>
                <Paper className="degreePaper" style={styles}>
                    {degrees}
                </Paper>
            </div>
        );
    }
}
//allows this state to be used within the component
function mapStateToProps(state){
    return({
        school: state.schools
    })
}
//connects the state to props
export default connect(mapStateToProps)(DegreeList);
