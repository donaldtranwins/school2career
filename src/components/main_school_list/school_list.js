import React, {Component} from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../actions/actions_index';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';
import Loader from '../loader/loading';

const style = {
    height: '20%',
    width: '98%',
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
};
const school = {
    color: 'red'
};
class SchoolList extends Component {

    render(){
        if (this.props.schools.showLoader) {
            return (
                <div className='schoolListScroll'>
                    <div id="schoolList" className="listContainer">
                        <Loader/>
                    </div>
                </div>
            )
        } else {
            let list = '';
            let noSchool = null;
            debugger;
            const data = this.props.schools.all;
            if (this.props.schools.noSchool) {
                if (this.props.schools.noSchool !== false) {
                    noSchool = this.props.schools.noSchool.length;
                } else {
                    noSchool = this.props.schools.noSchool;
                }
            }
            if(!data || noSchool == 1) {
                list = <div>No Schools Match The Current Criteria</div>;
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
                    const distance = Math.round(school.distance);

                    let www = school.url.indexOf('www.')
                    let url = null;
                    if (www < 0){
                        url = school.url;
                        return;
                    } else {
                        url = school.url.slice(www + 4);
                    }
                    const findForwardSlash = url.lastIndexOf('/');
                    if(findForwardSlash === url.length -1){
                        url = url.substring(0, url.length - 1);
                    }
                    const uniqueID = `sch${school.uid}`;
                    return(
                        <Paper className="listOfSchools" style={style} key={index} >
                            <ul style={mainUl} id={uniqueID}>
                                <li className='schoolListSchool'><Link to={`/school/${school.uid}`}>{school.name} </Link></li>
                                <li className='schoolListAddressli'>{school.city}, </li>
                                <li className='schoolListAddressli'>{school.state}</li>
                                <li className='schoolListUrl'><a target="_blank" href={'http://' + school.url}>{url}</a></li>
                                <ul style={ul}>
                                    <li className='col-md-4 col-sx-12 listViewStats'>{admissionRate}</li>
                                    <li className='col-md-4 col-sx-12 satList listViewStats'>{satAvg}</li>
                                    <li className='col-md-4 col-sx-12 distanceList listViewStats'>Distance: {distance} miles</li>
                                </ul>
                            </ul>
                        </Paper>
                    )
                });
            }
            return (
                <div className='schoolListScroll'>
                    <div id="schoolList" className="listContainer">
                        {list}
                    </div>
                </div>
            );
        }
    }
}
function mapStateToProps(state){
    return{
        schools: state.schools
    }
}
export default connect(mapStateToProps, {showLoader})(SchoolList);
