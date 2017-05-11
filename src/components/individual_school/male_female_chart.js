import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ResponsiveContainer, PieChart, Pie, Sector, Cell, Legend} from 'recharts';


const COLORS = ['#BA68C8', '#0088FE'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
const x  = cx + radius * Math.cos(-midAngle * RADIAN);
const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
        </text>
    );
};

class MF extends Component{
    render () {
        const school = this.props.schools.school
        let male = school.demog_men * 100;
        male = Math.round(parseFloat(male));
        let female = school.demog_women * 100;
        female = Math.round(parseFloat(female));
        const data = [
            {name: 'female', value: female },
            {name: 'male', value: male }
        ];
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
   const x  = cx + radius * Math.cos(-midAngle * RADIAN);
   const y = cy  + radius * Math.sin(-midAngle * RADIAN);

   return (
       <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
       {`${(percent * 100).toFixed(0)}%`}
       </text>
   );
};
        return (
           <div className="mfChart">
               <h4 className="titleMenWomanChart">Male to Female Ratio</h4>
               <ResponsiveContainer width="100%" height="90%">
                   <PieChart onMouseEnter={this.onPieEnter}>
                   <Pie
                       cy={'46%'}
                       legendType={ 'circle'}
                       data={data}
                       labelLine={false}
                       label={renderCustomizedLabel}
                       outerRadius={110}
                       fill="#8884d8"
                   >
                       {
                           data.map((entry, index) => <Cell key={entry} fill={COLORS[index % COLORS.length]}/>)
                       }
                   </Pie>
                   <Legend />

                   </PieChart>
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

export default connect(mapStateToProps)(MF);
