import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class mfChart extends Component {
    render() {
        let data = this.props.schools;
        if(!data){
            return <p>Loading...</p>
        }
        data = data[0];
        let male = data.UGDS_MEN * 100;
        male = Math.round(parseFloat(male));
        let female = data.UGDS_WOMEN * 100;
        female = Math.round(parseFloat(female));
        let chart = [
            {name: 'ratio of male to female', m: male, f: female}
            ];
        return (
            <div>
                <h3 className="titleMenWomanChart">Percentage of Men To Women </h3>
                <BarChart className="mfChart"  width={500} height={300} data={chart}
                          margin={{top: 5, right: 25, left: 0, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid />
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="m" fill="#00008B"/>
                    <Bar dataKey="f" fill="#FF7AD6"/>
                </BarChart>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        schools: state.schools.single,
    };
}

export default connect(mapStateToProps)(mfChart);