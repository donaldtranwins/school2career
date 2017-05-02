import React, {Component} from 'react';
import { connect } from 'react-redux';
import { searchForSchools } from '../../actions/actions_index'
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';

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
        this.props.searchForSchools() // don't think we need this.
    }
    render(){
        let list;
        const data = this.props.schools.all;
        if(!data){
            list = () => { return <p>Loading...</p>};
        } else {
            list = data.map((school, index) => {
                let admissionRate = parseFloat(school.adm_rate);
                if (parseFloat(admissionRate) > 0) {
                    admissionRate = (admissionRate * 100).toFixed(2);
                } else {
                    admissionRate = 'Admissions Rate Is Not Available';
                }
                return(
                    <Paper className="listOfSchools" style={style} key={index}>
                        <ul style={ul}>
                            <li className='schoolListSchool'><Link to={`/school/${school.uid}`}>{school.name} </Link></li>
                            <li className='schoolListAddressli'>{school.city}, </li>
                            <li className='schoolListAddressli'>{school.state}</li>
                            <li className='schoolListUrl'><a target="_blank" href={'http://' + school.url}>{school.url}</a></li>
                            <li>Admission Rate: {admissionRate}%</li>
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
export default connect(mapStateToProps, {searchForSchools})(SchoolList);
