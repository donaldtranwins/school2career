import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class mfChart extends Component {
    render() {
        let data = this.props.schools.schools;
        if(!data){
            return <p>Loading...</p>
        }
        data = data[0];
        let male = data.demog_men * 100;
        male = Math.round(parseFloat(male));
        let female = data.demog_women * 100;
        female = Math.round(parseFloat(female));
        let chart = [
            {name: 'ratio of male to female', m: male, f: female}
            ];
        return (
            <div className="mfChart">
                <h4 className="titleMenWomanChart">Percentage of Men To Women </h4>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chart}
                              margin={{top: 0, right: 50, left: 50, bottom: 0}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid />
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey="m" fill="#00008B"/>
                        <Bar dataKey="f" fill="#FF7AD6"/>
                    </BarChart>
                </ResponsiveContainer>
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
