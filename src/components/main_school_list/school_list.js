import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { searchForSchools } from '../../actions/actions_index'
import Paper from 'material-ui/Paper';

const style = {
  height: '20vh',
  width: '80vw',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};
const ul = {
    listStyleType: 'none'
}
const school = {
    color: 'red'
}
class SchoolList extends Component {
    componentWillMount(){
        this.props.searchForSchools()
    }
    render(){
        let list;
        const data = this.props.schools.all.data;
        console.log('schoolList data: ',data);
        if(!data){
            list = () => { return <p>Loading...</p>};
        } else {
            list = data.data.map((school, index) => {
                return(
                    <Paper style={style} key={index}>
                        <ul style={ul}>
                            <li className='schoolListSchool'>{school.INSTNM}</li>
                            <ul className='schoolListAddressUl'>
                                <li className='schoolListAddressli'>{school.CITY}</li>
                                <li className='schoolListAddressli'>{school.STABBR}</li>
                                <li className='schoolListAddressli'>{school.ZIP}</li>
                            </ul>
                            <li>{school.INSTURL}</li>
                        </ul>
                    </Paper>
                )
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
