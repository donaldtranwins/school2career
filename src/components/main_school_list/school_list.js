import React, {Component} from 'react';
import { connect } from 'react-redux';
import { searchForSchools } from '../../actions/actions_index'
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';

const style = {
    height: '20%',
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    marginTop: '2%'
};
const homeMainDiv = {
    height: '30%',
    width: '80%',
    margin: '20px'
};
const mainUl = {
    listStyleType: 'none',
    width: '100%',
    position: 'relative',
    padding: '10px',
    margin: '10px'
};
const ul = {
    listStyleType: 'none',
    padding: 'initial'
}
const school = {
    color: 'red'
};
class SchoolList extends Component {
    componentWillMount(){
        // this.props.searchForSchools() // don't think we need this.
    }
    render(){
        let list;
        const data = this.props.schools.all;
        if(!data){
            list = <p className="noSchools">No schools match the current criteria.</p>;
        } else {
            list = data.map((school, index) => {
                let admissionRate = parseFloat(school.adm_rate);
                if (parseFloat(admissionRate) > 0) {
                    admissionRate = (admissionRate * 100).toFixed(2);
                    admissionRate = 'Admission Rate: ' + admissionRate + '%';
                } else {
                    admissionRate = '';
                }
                let satAvg = parseInt(school.sat_avg);
                if (satAvg === 0){
                    satAvg = '';
                } else {
                    satAvg = 'SAT Avg: ' + satAvg;
                }
                return(
                    <Paper className="listOfSchools" style={style} key={index}>
                        <ul style={mainUl}>
                            <li className='schoolListSchool'><Link to={`/school/${school.uid}`}>{school.name} </Link></li>
                            <li className='schoolListAddressli'>{school.city}, </li>
                            <li className='schoolListAddressli'>{school.state}</li>
                            <li className='schoolListUrl'><a target="_blank" href={'http://' + school.url}>{school.url}</a></li>
                            <ul style={ul}>
                                <li className='listViewStats'>{admissionRate}</li>
                                <li className='listViewStats'>{satAvg}</li>
                            </ul>
                        </ul>
                    </Paper>
                )
            });
        };
        return(
            <div className='schoolListScroll'>
                <div id="schoolList" className="listContainer">
                    {list}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    console.log('school list: ', state.schools)
    return{
        schools: state.schools
    }
}
export default connect(mapStateToProps, {searchForSchools})(SchoolList);
