import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PieChart, Pie, Sector } from 'recharts';


const degreeTypes = {
    CIP01ASSOC : "Agriculture",
    CIP03ASSOC : "Natural Resources & Conservation",
    CIP04ASSOC : "Architecture",
    CIP05BACHL : "Ethnic & Cultural Studies",
    CIP09BACHL : "Journalism",
    CIP10ASSOC : "Communications",
    CIP11ASSOC : "Computer Sciences",
    CIP12ASSOC : "Culinary",
    CIP13ASSOC : "Education",
    CIP14ASSOC : "Engineering",
    CIP15ASSOC : "Engineering Technologies",
    CIP16ASSOC : "Linguistics",
    CIP19ASSOC : "Consumer Sciences/Human Sciences",
    CIP22ASSOC : "Law",
    CIP23ASSOC : "English",
    CIP24ASSOC : "Liberal Arts And Sciences",
    CIP25ASSOC : "Library Science",
    CIP26ASSOC : "Biological & Biomedical Sciences.",
    CIP27ASSOC : "Mathematics & Statistics",
    CIP29ASSOC : "Military Technologies & Applied Sciences.",
    CIP30ASSOC : "Multi/Interdisciplinary Studies",
    CIP31ASSOC : "Fitness Studies",
    CIP38ASSOC : "Philosophy",
    CIP39ASSOC : "Theology & Religious Vocations",
    CIP40ASSOC : "Physical Sciences",
    CIP41ASSOC : "Science Technologies/Technicians",
    CIP42ASSOC : "Psychology",
    CIP43ASSOC : "Homeland Security, Law Enforcement",
    CIP44ASSOC : "Public Admin & Social Service",
    CIP45ASSOC : "Social Sciences",
    CIP46ASSOC : "Construction Trades",
    CIP47ASSOC : "Mechanic & Repair Tech.",
    CIP48ASSOC : "Precision Production",
    CIP49ASSOC : "Transportation & Materials",
    CIP50ASSOC : "Performing Arts",
    CIP51ASSOC : "Health Professions",
    CIP52ASSOC : "Business",
    CIP54ASSOC : "History"
};

const degreePercent = {
    CIP01ASSOC : "Agriculture",
    CIP03ASSOC : "Natural Resources & Conservation",
    CIP04ASSOC : "Architecture",
    CIP05BACHL : "Ethnic & Cultural Studies",
    CIP09BACHL : "Journalism",
    CIP10ASSOC : "Communications",
    CIP11ASSOC : "Computer Sciences",
    CIP12ASSOC : "Culinary",
    CIP13ASSOC : "Education",
    CIP14ASSOC : "Engineering",
    CIP15ASSOC : "Engineering Technologies",
    CIP16ASSOC : "Linguistics",
    CIP19ASSOC : "Consumer Sciences/Human Sciences",
    CIP22ASSOC : "Law",
    CIP23ASSOC : "English",
    CIP24ASSOC : "Liberal Arts And Sciences",
    CIP25ASSOC : "Library Science",
    CIP26ASSOC : "Biological & Biomedical Sciences.",
    CIP27ASSOC : "Mathematics & Statistics",
    CIP29ASSOC : "Military Technologies & Applied Sciences.",
    CIP30ASSOC : "Multi/Interdisciplinary Studies",
    CIP31ASSOC : "Fitness Studies",
    CIP38ASSOC : "Philosophy",
    CIP39ASSOC : "Theology & Religious Vocations",
    CIP40ASSOC : "Physical Sciences",
    CIP41ASSOC : "Science Technologies/Technicians",
    CIP42ASSOC : "Psychology",
    CIP43ASSOC : "Homeland Security, Law Enforcement",
    CIP44ASSOC : "Public Admin & Social Service",
    CIP45ASSOC : "Social Sciences",
    CIP46ASSOC : "Construction Trades",
    CIP47ASSOC : "Mechanic & Repair Tech.",
    CIP48ASSOC : "Precision Production",
    CIP49ASSOC : "Transportation & Materials",
    CIP50ASSOC : "Performing Arts",
    CIP51ASSOC : "Health Professions",
    CIP52ASSOC : "Business",
    CIP54ASSOC : "History"
};

// console.log('majors %', this.props)
let data = [];

data = [
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

class MajorChart extends Component {
    constructor(props){
        super(props)
        this.state = {
            activeIndex: 0
        };
        this.onPieEnter = this.onPieEnter.bind(this);
    }
    onPieEnter(data, index) {
        this.setState({
            activeIndex: index
        });
    }
    componentWillMount(){
        console.log('inside MajorChart: ', this.props.schools);
        this.createSchools();
    }
    createSchools(){
        console.log('createSchools', this.props)
        const school = this.props.schools[0];
        const majors = [];
        for (var i in school){

        }
        return data
    }
    renderActiveShape = (props) => {
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
            {`(Major ${(percent * 100).toFixed(2)}%)`}
          </text>
        </g>
      );
    };
    render () {
        return (
            <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
            <Pie
            activeIndex={this.state.activeIndex}
            activeShape={this.renderActiveShape}
            data={data}
            cx={400}
            cy={200}
            innerRadius={80}
            outerRadius={100}
            fill="#338833"/>
            </PieChart>
        )
    }
}

function mapStateToProps(state) {
    return {
        schools: state.schools.single,
    };
}
export default connect(mapStateToProps)(MajorChart);
