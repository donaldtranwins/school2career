import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ResponsiveContainer, BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


class MajorChart extends Component{
    	render () {
            const majors = this.props.school.single.school.programs.map(function(obj){
                let returnObj = {};
                returnObj['name'] = obj.name;
                returnObj['Graduation %'] = Math.ceil(parseFloat(obj.percent) * 100);
                return returnObj
            });
            let majorHeight = '800px';
            if (majors.length === 1){
                majorHeight = '120px';
            } else if (majors.length <= 5){
                majorHeight = '300px';
            } else if (majors.length <= 10){
                majorHeight = '500px';
            } else if (majors.length <= 20){
                majorHeight = '800px';
            } else if (majors.length <= 30){
                majorHeight = '1200px';
            } else if (majors.length <= 38){
                majorHeight = '1500px';
            }
            const divStyle = {
                margin: '0 auto',
                height: majorHeight,
                width: '100%'
            };
      	return (
            <div style={divStyle}>
                <h4 className="majorPercent">Percentage Of Graduates By Major</h4>
                <ResponsiveContainer width="100%" height="90%">
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
                      <Bar dataKey="Graduation %" fill="#26A69A" />
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
