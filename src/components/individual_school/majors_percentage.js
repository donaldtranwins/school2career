import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PieChart, Pie, Sector } from 'recharts';

console.log('major % ', data)

const data = [
    {name: 'ENGLISH', value: 400},
    {name: 'LIBERAL ARTS AND SCIENCES', value: 300},
    {name: 'ACCOUNTING', value: 300},
    {name: 'CRIMINAL JUSTICE', value: 200},
    {name: 'TEACHER EDUCATION', value: 200},
    {name: 'BIOLOGY', value: 400},
    {name: 'PSYCHOLOGY', value: 300},
    {name: 'BUSINESS', value: 300},
    {name: 'Group D', value: 200},
    {name: 'Group R', value: 200},
    {name: 'Group A', value: 400},
    {name: 'Group B', value: 300},
    {name: 'Group C', value: 300},
    {name: 'Group D', value: 200},
    {name: 'Group R', value: 200},
    {name: 'Group A', value: 400},
    {name: 'Group B', value: 300},
    {name: 'Group C', value: 300},
    {name: 'Group D', value: 200},
    {name: 'Group R', value: 200}
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      {/* <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text> */}
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Major ${(percent * 100).toFixed(2)}% of School)`}
      </text>
    </g>
  );
};

const MajorChart = React.createClass({
	getInitialState() {
    return {
      activeIndex: 0,
    };
  },

  onPieEnter(data, index) {
    this.setState({
      activeIndex: index,
    });
  },
	render () {
  	return (
    	<PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
        	activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={400}
          cy={200}
          innerRadius={120}
          outerRadius={150}
          fill="#338833"/>
       </PieChart>
    );
  }
})

function mapStateToProps(state) {
    return {
        schools: state.schools.single,
    };
}

export default connect(mapStateToProps)(MajorChart);
