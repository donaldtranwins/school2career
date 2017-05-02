import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchOneSchool } from '../../actions/actions_index';
import Map from './places_image';
import Paper from 'material-ui/Paper';
import MfChart from './male_female_chart';
import MajorChart from './majors_percentage';
import DegreesOffered from './degree_offered';


class School extends Component {

    componentDidMount() {
        var pathArray = window.location.pathname.split( '/' );
        this.props.searchOneSchool(pathArray[pathArray.length -1]);
    }

    render() {
        let data = this.props.school;
        if(!data){
            return <p>Loading...</p>
        }
        data = data.schools[0];
        console.log('school: ', data)
        //Admissions Rate Math
        let admissionRate = parseFloat(data.adm_rate);
        if (parseFloat(admissionRate) > 0) {
            admissionRate = admissionRate * 100;
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


        return (
            <div>
                <div className="container">
                    <img className="schoolImg col-sm-12 offset-lg-1 col-lg-10 " src={this.props.schoolImgURL} />
                    <div className="schoolInfo">
                        <h2>{data.name} </h2>
                        <h4>{data.city}, {data.state}</h4>
                        <div className="row">
                        <h5 className="webAddress col-md-3"><a target="_blank" href={'http://' + data.url}>{data.url}</a></h5>
                        <h5 className="col-md-3">{instType} School</h5>
                        </div>
                    </div>
                    <Map id="mapShowing"/>
                    <div className="scores col-sm">
                        <Paper className="statsWrapper">
                            <div className="row">
                                <h4 className="col-md-4">Admissions Rate: {admissionRate}%</h4>
                                <h4 className="col-md-4">SAT Average: {satAvg}</h4>
                                <h4 className="col-md-4">Undergraduate Size: {data.size} students</h4>
                            </div>
                            <br/>
                            <div className="row">
                                <h4 className="col-md-6">Tuition (in state): ${data.tuition_in}</h4>
                                <h4 className="col-md-6">Tuition (out of state): ${data.tuition_out}</h4>
                            </div>
                        </Paper>
                    </div>
                    <div className="row">
                        <MfChart />
                        <MajorChart />
                    </div>
                    <DegreesOffered />
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
