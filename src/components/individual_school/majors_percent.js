import React, { Component } from 'react';
import {ResponsiveContainer, BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const dummy = {
    "success": true,
    "school": {
        "uid": "100654",
        "name": "Alabama A & M University",
        "city": "Normal",
        "state": "AL",
        "lat": "34.7834",
        "lng": "-86.5685",
        "url": "www.aamu.edu/",
        "alias": "AAMU",
        "size": "4206",
        "demog_men": "0.4831",
        "demog_women": "0.5169",
        "adm_rate": "0.5256",
        "sat_avg": "827",
        "ownership": "1",
        "tuition_in": "9096",
        "tuition_out": "16596",
        "programs": [
            {
                "name": "Agriculture",
                "percent": "0.0424",
                "associates": "0",
                "bachelors": "1",
                "description": "Agriculture, Agriculture Operations, and Related Sciences"
            },
            {
                "name": "Architecture",
                "percent": "0.0169",
                "associates": "0",
                "bachelors": "1",
                "description": "Architecture and Related Services"
            },
            {
                "name": "Biology and Biomedical",
                "percent": "0.0975",
                "associates": "0",
                "bachelors": "1",
                "description": "Biological and Biomedical Sciences"
            },
            {
                "name": "Business",
                "percent": "0.197",
                "associates": "0",
                "bachelors": "2",
                "description": "Business, Management, Marketing, and Related Support Services"
            },
            {
                "name": "Communications Tech",
                "percent": "0.0487",
                "associates": "0",
                "bachelors": "1",
                "description": "Communications Technologies/Technicians and Support Services"
            },
            {
                "name": "Computer Science",
                "percent": "0.0275",
                "associates": "0",
                "bachelors": "1",
                "description": "Computer And Information Sciences and Support Services"
            },
            {
                "name": "Education",
                "percent": "0.1123",
                "associates": "0",
                "bachelors": "1",
                "description": "Education"
            },
            {
                "name": "Engineering",
                "percent": "0.1081",
                "associates": "0",
                "bachelors": "1",
                "description": "Engineering"
            },
            {
                "name": "Engineering Tech",
                "percent": "0.0339",
                "associates": "0",
                "bachelors": "1",
                "description": "Engineering Technologies and Engineering-Related Fields"
            },
            {
                "name": "English",
                "percent": "0.0127",
                "associates": "0",
                "bachelors": "1",
                "description": "English Language and Literature/Letters"
            },
            {
                "name": "Family & Consumer Sci",
                "percent": "0.0254",
                "associates": "0",
                "bachelors": "1",
                "description": "Family and Consumer Sciences/Human Sciences"
            },
            {
                "name": "Humanities",
                "percent": "0.0424",
                "associates": "0",
                "bachelors": "1",
                "description": "Liberal Arts and Sciences, General Studies and Humanities"
            },
            {
                "name": "Law Enforcement",
                "percent": "0.0085",
                "associates": "0",
                "bachelors": "1",
                "description": "Homeland Security, Law Enforcement, Firefighting and Related Protective Services"
            },
            {
                "name": "Mathematics",
                "percent": "0.0169",
                "associates": "0",
                "bachelors": "1",
                "description": "Mathematics and Statistics"
            },
            {
                "name": "Nat Resources & Conservation",
                "percent": "0.0191",
                "associates": "0",
                "bachelors": "1",
                "description": "Natural Resources and Conservation"
            },
            {
                "name": "Physical Sciences",
                "percent": "0.0127",
                "associates": "0",
                "bachelors": "1",
                "description": "Physical Sciences"
            },
            {
                "name": "Psychology",
                "percent": "0.0487",
                "associates": "0",
                "bachelors": "1",
                "description": "Psychology"
            },
            {
                "name": "Social Services",
                "percent": "0.0572",
                "associates": "0",
                "bachelors": "1",
                "description": "Public Administration and Social Service Professions"
            },
            {
                "name": "Social Sciences",
                "percent": "0.0424",
                "associates": "0",
                "bachelors": "1",
                "description": "Social Sciences"
            },
            {
                "name": "Visual and Performing Arts",
                "percent": "0.0297",
                "associates": "0",
                "bachelors": "1",
                "description": "Visual and Performing Arts"
            }
        ]
    }
}

const majors = dummy.school.programs.map(function(obj){
    var returnObj = {};
    returnObj['name'] = obj.name;
    returnObj['Graduation %'] = Math.round(parseFloat(obj.percent) * 100);
    return returnObj
})
console.log(majors)
const numMajors = dummy.school.programs.length;
let COLORS = [];
if( numMajors <= 5 ){
    COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FFFF00'];
} else if( numMajors < 10 ){
    COLORS = ['#4D4D4D', '#5DA5DA', '#FAA43A', '#60BD68', '#F17CB0', '#B2912F', '#B276B2', '#DECF3F', "#F15854", '#DD4477'];
} else if (numMajors <= 20 ){
    COLORS = [ '#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', "#66AA00", '#B82E2E',
                '#316395', '#994499', '#22AA99', '#AAAA11', '6633CC', '#E67300', '#8B0707', "#329262", '#5574A6', '#3B3EAC' ];
} else if (numMajors <= 30){
    COLORS = [ '#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', "#66AA00", '#B82E2E',
                '#316395', '#994499', '#22AA99', '#AAAA11', '6633CC', '#E67300', '#8B0707', "#329262", '#5574A6', '#5574A6' ];
}
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{/* {`${(percent * 100).toFixed(0)}%`} */}
    </text>
  );
};

class MajorChart extends Component{
    	render () {
      	return (
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

        );
      }
}


export default MajorChart;
