import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { searchForSchools } from '../../actions/actions_index'

class SchoolList extends Component {
    componentWillMount(){
        this.props.searchForSchools()
    }
    render(){
        console.log('school list: ', this.props)
        return(
            <div>
                <p>{this.props.schools.all.schoolName}</p>
                <p>{this.props.schools.all.city}</p>
                <p>{this.props.schools.all.state}</p>
                <p>{this.props.schools.all.url}</p>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        schools: state.schools
    }
}
export default connect(mapStateToProps, {searchForSchools: searchForSchools})(SchoolList);
