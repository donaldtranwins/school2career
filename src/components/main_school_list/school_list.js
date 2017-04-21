import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { searchForSchools } from '../../actions/actions_index'

class SchoolList extends Component {
    componentWillMount(){
        this.props.searchForSchools()
    }
    render(){
        debugger
        const data = this.props.schools.all.data;
        if(!data){
            const list = <p>Loading...</p>;
        } else {
            const list = this.props.schools.all.data.data.map((school, index) => {
                return <ul key={index}>
                    <li>{school.INSTNM}</li>
                    <li>{school.INSTURL}</li>
                    <li>{school.ZIP}</li>
                    <li>{school.CITY}</li>
                </ul>
            });
        };
        return(
            <div>
                <h1>List of Schools</h1>
                <div>
                    {list}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        schools: state.schools
    }
}
export default connect(mapStateToProps, {searchForSchools: searchForSchools})(SchoolList);
