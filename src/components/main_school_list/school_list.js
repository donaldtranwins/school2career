import React, {Component} from 'react';
import { connect } from 'react-redux';
import { searchForSchools } from '../../actions/actions_index'
import Paper from 'material-ui/Paper';

const style = {
    height: '20%',
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    margin: '15px auto'
};
const homeMainDiv = {
    height: '30%',
    width: '80%',
    margin: '20px'
};
const ul = {
    listStyleType: 'none',
    padding: '10px',
    margin: '10px'
};
const school = {
    color: 'red'
};
class SchoolList extends Component {
    componentWillMount(){
        this.props.searchForSchools()
    }
    render(){
        let list;
        const data = this.props.schools.all.data;
        if(!data){
            list = () => { return <p>Loading...</p>};
        } else {
            list = data.data.map((school, index) => {
                return(
                    <Paper className="listOfSchools" style={style} key={index}>
                        <ul style={ul}>
                            <li className='schoolListSchool'>{school.INSTNM}</li>
                            <li className='schoolListAddressli'>{school.CITY}, </li>
                            <li className='schoolListAddressli'>{school.STABBR}</li>
                            <li className='schoolListUrl'><a target="_blank" href={'http://' + school.INSTURL}>{school.INSTURL}</a></li>
                            <li>Admission Rate: {school.ADM_RATE}</li>
                        </ul>
                    </Paper>
                )
            });
        };
        return(
            <div>
                <div id="schoolList" className="listContainer hidden">
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
