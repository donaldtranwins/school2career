import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { searchOneSchool } from '../../actions/actions_index';
import Map from './places_image';
import Paper from 'material-ui/Paper';

import MajorsChart from './majors_percent';
import MfChart from './male_female_chart';
import DegreesOffered from './degree_offered';
import ReturnToListbtn from './btn_return_list';

class School extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    handleClick() {
        console.log('handleClick');
        this.context.router.push('/school_search');
    };
    componentDidMount() {
        var pathArray = window.location.pathname.split( '/' );
        console.log(pathArray[pathArray.length -1]);
        this.props.searchOneSchool(pathArray[pathArray.length -1]);
    };

    render() {
        let data = this.props.school;
        if(!data){
            return <p>Loading...</p>
        };
        data = data.schools[0];
        console.log('school: ', data);
        //Admissions Rate Math
        let admissionRate = parseFloat(data.adm_rate);
        if (parseFloat(admissionRate) > 0) {
            admissionRate = (admissionRate * 100).toFixed(2);
            admissionRate += '%';
        } else {
            admissionRate = 'Admissions Rate Is Not Available';
        }
        //SAT SCORE
        let satAvg = parseInt(data.sat_avg);
        if (satAvg===0) {
            satAvg = "SAT Score Average Is Not Available";
        }
        //School Type
        let instType = data.ownership;
        instType = parseInt(instType);
        switch (instType) {
            case 1:
                instType = "Public";
                break;
            case 2:
                instType = "Private (nonprofit)";
                break;
            case 3:
                instType = "Private (for-profit)";
                break;
        }
        let tuitionIn = (parseFloat(data.tuition_in)).toLocaleString();
        let tuitionOut = (parseFloat(data.tuition_out)).toLocaleString();
        return (
            <div>
                <div className='imageDiv'>
                    <img className="schoolImg col-sm-12 " src={this.props.schoolImgURL} />
                    <div className="schoolName">
                        <h2 className='universityText'>{data.name} </h2>
                        <h4 className='universityText'>{data.city}, {data.state}</h4>
                        <h5 className="webAddress universityText col-md-5"><a target="_blank" href={'http://' + data.url}>{data.url}</a></h5>
                    </div>
                </div>
                <ReturnToListbtn onClick={() => this.handleClick()}/>
                <div className="container">
                    <Paper className="statsWrapper">
                        <div className="row">
                            <h4 className="col-md-4 singleStats">Admissions Rate: {admissionRate}</h4>
                            <h4 className="col-md-4 singleStats">SAT Ave: {satAvg}</h4>
                            <h4 className="col-md-4 singleStats">Undergrad Size: {data.size} students</h4>
                        </div>
                        <br/>
                        <div className="row">
                            <h4 className="col-md-4 singleStats">{instType} School</h4>
                            <h4 className="col-md-4 singleStats">Tuition (in state): ${tuitionIn}</h4>
                            <h4 className="col-md-4 singleStats">Tuition (out of state): ${tuitionOut}</h4>
                        </div>
                    </Paper>
                    <Paper className="mapPaper">
                        <Map id="mapShowing"/>
                    </Paper>
                    <Paper className="statsWrapper">
                        <MfChart />
                    </Paper>
                    {/* <Paper>
                        <MajorChart />
                    </Paper> */}
                    <Paper>
                        <MajorsChart />
                    </Paper>
                    <Paper className="statsWrapper">
                        <DegreesOffered />
                    </Paper>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        school: state.schools.single,
        schoolImgURL: state.schoolImgURL.image
    };
}

export default connect(mapStateToProps, { searchOneSchool })(School);
