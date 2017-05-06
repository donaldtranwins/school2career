import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ResponsiveContainer, BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


class MajorChart extends Component{
    	render () {
            const majors = this.props.school.single.school.programs.map(function(obj){
                let returnObj = {};
                returnObj['name'] = obj.name;
                returnObj['Graduation %'] = Math.round(parseFloat(obj.percent) * 100);
                return returnObj
            })
            console.log('major: ', this.props.school.single.school.programs)
      	return (
            <div className='majorsChartDiv'>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                      data={majors}
                      layout="vertical"
                      margin={{top: 5, right: 30, left: 0, bottom: 5}}
                    >
                      <XAxis scaleToFit={true} type="number"/>
                      <YAxis width={250} tickLine={false} type="category" dataKey="name" />
                      <CartesianGrid strokeDasharray="3 3"/>
                      <Tooltip/>
                      <Legend />
                      <Bar dataKey="Graduation %" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
      }
}

function mapStateToProps(state){
    return({
    school: state.schools
    })
}

export default connect(mapStateToProps)(MajorChart);
