import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PieChart, Pie, Sector } from 'recharts';


const degreeTypes = {
    deg_agri_2 : "Agriculture",
    deg_nat_resources_2 : "Natural Resources & Conservation",
    deg_arch_2 : "Architecture",
    deg_anthro_2 : "Ethnic & Cultural Studies",
    deg_comm_2 : "Journalism",
    deg_comm_tech_2 : "Communications",
    deg_comp_sci_2 : "Computer Sciences",
    deg_culinary_2 : "Culinary",
    deg_edu_2 : "Education",
    deg_engi_2 : "Engineering",
    deg_engi_tech_2 : "Engineering Technologies",
    deg_linguistics_2 : "Linguistics",
    deg_fam_cnsmr_sci_2 : "Consumer Sciences/Human Sciences",
    deg_legal_2 : "Law",
    deg_english_2 : "English",
    deg_humanities_2 : "Liberal Arts And Sciences",
    deg_library_sci_2 : "Library Science",
    deg_biol_sci_2 : "Biological & Biomedical Sciences.",
    deg_math_2 : "Mathematics & Statistics",
    deg_military_2 : "Military Technologies & Applied Sciences.",
    deg_multi_2 : "Multi/Interdisciplinary Studies",
    deg_parks_rec_2 : "Fitness Studies",
    deg_phil_religion_2 : "Philosophy",
    deg_theology_2 : "Theology & Religious Vocations",
    deg_phys_sci_2 : "Physical Sciences",
    deg_sci_tech_2 : "Science Technologies/Technicians",
    deg_psych_2 : "Psychology",
    deg_law_enf_secur_2 : "Homeland Security, Law Enforcement",
    deg_pub_adm_soc_serv_2 : "Public Admin & Social Service",
    deg_soc_sci_2 : "Social Sciences",
    deg_construction_2 : "Construction Trades",
    deg_mechanic_2 : "Mechanic & Repair Tech.",
    deg_precision_prod_2 : "Precision Production",
    deg_transportation_2 : "Transportation & Materials",
    deg_vis_perf_arts_2 : "Performing Arts",
    deg_health_2 : "Health Professions",
    deg_bus_mktg_mgmt_2 : "Business",
    deg_history_2 : "History"
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
            <div className="circleChart hidden-sm-down">
                <h3 className="titleMenWomanChart">Percentage of Degrees Awarded </h3>
                <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
                <Pie
                activeIndex={this.state.activeIndex}
                activeShape={this.renderActiveShape}
                data={data}
                cx={400}
                cy={200}
                innerRadius={120}
                outerRadius={150}
                fill="#338833"/>
                </PieChart>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        schools: state.schools.single,
    };
}
export default connect(mapStateToProps)(MajorChart);
