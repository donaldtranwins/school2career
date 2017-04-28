import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchOneSchool } from '../../actions/actions_index';
import Map from './places_image';
import AppBar from '../app_bar';
import Paper from 'material-ui/Paper';
import MfChart from './male_female_chart';

class School extends Component {

    componentWillMount() {
        this.props.searchOneSchool();
    }

    render() {
        let data = this.props.schools;
        if(!data){
            return <p>Loading...</p>
        }
        data = data[0];
        //Admissions Rate Math
        let admissionRate = parseFloat(data.ADM_RATE);
        if (parseFloat(admissionRate) > 0) {
            admissionRate = admissionRate * 100;
        } else {
            admissionRate = 'Admissions Rate Is Not Available';
        }
        //SAT SCORE
        let satAvg = parseInt(data.SAT_AVG);
        if (satAvg===0) {
            satAvg = "SAT Score Average Is Not Available";
        }
        //School Type
        let instType = data.CONTROL;
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
                <AppBar/>
                <div className="container">
                    <img className="schoolImg col-sm-12 offset-lg-1 col-lg-10 " src={this.props.schoolImgURL} />
                    <div className="schoolInfo">
                        <h2>{data.INSTNM} </h2>
                        <h4>{data.CITY}, {data.STABBR}</h4>
                        <div className="row">
                        <h5 className="webAddress col-md-3"><a target="_blank" href={'http://' + data.INSTURL}>{data.INSTURL}</a></h5>
                        <h5 className="col-md-3">{instType} School</h5>
                        </div>
                    </div>
                    <Map id="mapShowing"/>
                    <div className="scores col-sm">
                        <Paper className="statsWrapper">
                            <div className="row">
                                <h4 className="col-md-4">Admissions Rate: {admissionRate}%</h4>
                                <h4 className="col-md-4">SAT Average: {satAvg}</h4>
                                <h4 className="col-md-4">Undergraduate Size: {data.UGDS} students</h4>
                            </div>
                            <br/>
                            <div className="row">
                                <h4 className="col-md-6">Tuition (in state): ${data.TUITIONFEE_IN}</h4>
                                <h4 className="col-md-6">Tuition (out of state): ${data.TUITIONFEE_OUT}</h4>
                            </div>
                        </Paper>
                    </div>
                    <div className="row">
                        <MfChart />
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        schools: state.schools.single,
        schoolImgURL: state.schoolImgURL.image
    };
}

export default connect(mapStateToProps, { searchOneSchool })(School);