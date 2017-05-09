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
        const degrees = this.props.school.single.school.programs.map(function(obj){
            let degreeInfo = "";
            if (obj.associates == 1) {
                degreeInfo += 'Associates, '
            }
            if (obj.bachelors == 1) {
                degreeInfo += ' Bachelors,'
            }
            degreeInfo += ' offered in ' + obj.name;
            return <div key={obj.name}>{degreeInfo}</div>
        });



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

function mapStateToProps(state){
    return({
        school: state.schools
    })
}

export default connect(mapStateToProps)(DegreeList);
