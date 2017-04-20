import React, {Component} from 'react';
import { connect } from 'react-router';
import { Link } from 'react-router';
import { searchForSchools } from '../../actions/actions_index'

console.log('school list: ', searchForSchools)

class SchoolList extends Component {
    componentWillMount(){
        this.props.searchForSchools
    }
    render(){
        return(
            <h1>schoolList</h1>
        )
    }
}
export default SchoolList
