import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

const degreeTypes = {
    CIP01ASSOC : "Associate degree in Agriculture, Agriculture Operations, And Related Sciences.",
    CIP01BACHL : "Bachelor's degree in Agriculture, Agriculture Operations, And Related Sciences.",
    CIP03ASSOC : "Associate degree in Natural Resources And Conservation.",
    CIP03BACHL : "Bachelor's degree in Natural Resources And Conservation.",
    CIP04ASSOC : "Associate degree in Architecture And Related Services.",
    CIP04BACHL : "Bachelor's degree in Architecture And Related Services.",
    CIP05ASSOC : "Associate degree in Area, Ethnic, Cultural, Gender, And Group Studies.",
    CIP05BACHL : "Bachelor's degree in Area, Ethnic, Cultural, Gender, And Group Studies.",
    CIP09ASSOC : "Associate degree in Communication, Journalism, And Related Programs.",
    CIP09BACHL : "Bachelor's degree in Communication, Journalism, And Related Programs.",
    CIP10ASSOC : "Associate degree in Communications Technologies/Technicians And Support Services.",
    CIP10BACHL : "Bachelor's degree in Communications Technologies/Technicians And Support Services.",
    CIP11ASSOC : "Associate degree in Computer And Information Sciences And Support Services.",
    CIP11BACHL : "Bachelor's degree in Computer And Information Sciences And Support Services.",
    CIP12ASSOC : "Associate degree in Personal And Culinary Services.",
    CIP12BACHL : "Bachelor's degree in Personal And Culinary Services.",
    CIP13ASSOC : "Associate degree in Education.",
    CIP13BACHL : "Bachelor's degree in Education.",
    CIP14ASSOC : "Associate degree in Engineering.",
    CIP14BACHL : "Bachelor's degree in Engineering.",
    CIP15ASSOC : "Associate degree in Engineering Technologies And Engineering-Related Fields.",
    CIP15BACHL : "Bachelor's degree in Engineering Technologies And Engineering-Related Fields.",
    CIP16ASSOC : "Associate degree in Foreign Languages, Literatures, And Linguistics.",
    CIP16BACHL : "Bachelor's degree in Foreign Languages, Literatures, And Linguistics.",
    CIP19ASSOC : "Associate degree in Family And Consumer Sciences/Human Sciences.",
    CIP19BACHL : "Bachelor's degree in Family And Consumer Sciences/Human Sciences.",
    CIP22ASSOC : "Associate degree in Legal Professions And Studies.",
    CIP22BACHL : "Bachelor's degree in Legal Professions And Studies.",
    CIP23ASSOC : "Associate degree in English Language And Literature/Letters.",
    CIP23BACHL : "Bachelor's degree in English Language And Literature/Letters.",
    CIP24ASSOC : "Associate degree in Liberal Arts And Sciences, General Studies And Humanities.",
    CIP24BACHL : "Bachelor's degree in Liberal Arts And Sciences, General Studies And Humanities.",
    CIP25ASSOC : "Associate degree in Library Science.",
    CIP25BACHL : "Bachelor's degree in Library Science.",
    CIP26ASSOC : "Associate degree in Biological And Biomedical Sciences.",
    CIP26BACHL : "Bachelor's degree in Biological And Biomedical Sciences.",
    CIP27ASSOC : "Associate degree in Mathematics And Statistics.",
    CIP27BACHL : "Bachelor's degree in Mathematics And Statistics.",
    CIP29ASSOC : "Associate degree in Military Technologies And Applied Sciences.",
    CIP29BACHL : "Bachelor's degree in Military Technologies And Applied Sciences.",
    CIP30ASSOC : "Associate degree in Multi/Interdisciplinary Studies.",
    CIP30BACHL : "Bachelor's degree in Multi/Interdisciplinary Studies.",
    CIP31ASSOC : "Associate degree in Parks, Recreation, Leisure, And Fitness Studies.",
    CIP31BACHL : "Bachelor's degree in Parks, Recreation, Leisure, And Fitness Studies.",
    CIP38ASSOC : "Associate degree in Philosophy And Religious Studies.",
    CIP38BACHL : "Bachelor's degree in Philosophy And Religious Studies.",
    CIP39ASSOC : "Associate degree in Theology And Religious Vocations.",
    CIP39BACHL : "Bachelor's degree in Theology And Religious Vocations.",
    CIP40ASSOC : "Associate degree in Physical Sciences.",
    CIP40BACHL : "Bachelor's degree in Physical Sciences.",
    CIP41ASSOC : "Associate degree in Science Technologies/Technicians.",
    CIP41BACHL : "Bachelor's degree in Science Technologies/Technicians.",
    CIP42ASSOC : "Associate degree in Psychology.",
    CIP42BACHL : "Bachelor's degree in Psychology.",
    CIP43ASSOC : "Associate degree in Homeland Security, Law Enforcement, Firefighting And Related Protective Services.",
    CIP43BACHL : "Bachelor's degree in Homeland Security, Law Enforcement, Firefighting And Related Protective Services.",
    CIP44ASSOC : "Associate degree in Public Administration And Social Service Professions.",
    CIP44BACHL : "Bachelor's degree in Public Administration And Social Service Professions.",
    CIP45ASSOC : "Associate degree in Social Sciences.",
    CIP45BACHL : "Bachelor's degree in Social Sciences.",
    CIP46ASSOC : "Associate degree in Construction Trades.",
    CIP46BACHL : "Bachelor's degree in Construction Trades.",
    CIP47ASSOC : "Associate degree in Mechanic And Repair Technologies/Technicians.",
    CIP47BACHL : "Bachelor's degree in Mechanic And Repair Technologies/Technicians.",
    CIP48ASSOC : "Associate degree in Precision Production.",
    CIP48BACHL : "Bachelor's degree in Precision Production.",
    CIP49ASSOC : "Associate degree in Transportation And Materials Moving.",
    CIP49BACHL : "Bachelor's degree in Transportation And Materials Moving.",
    CIP50ASSOC : "Associate degree in Visual And Performing Arts.",
    CIP50BACHL : "Bachelor's degree in Visual And Performing Arts.",
    CIP51ASSOC : "Associate degree in Health Professions And Related Programs.",
    CIP51BACHL : "Bachelor's degree in Health Professions And Related Programs.",
    CIP52ASSOC : "Associate degree in Business, Management, Marketing, And Related Support Services.",
    CIP52BACHL : "Bachelor's degree in Business, Management, Marketing, And Related Support Services.",
    CIP54ASSOC : "Associate degree in History.",
    CIP54BACHL : "Bachelor's degree in History."
};


class degrees extends Component {

    render() {
        const  degreeCodes = {
            CIP01ASSOC : "0",
            CIP01BACHL : "0",
            CIP03ASSOC : "0",
            CIP03BACHL : "1",
            CIP04ASSOC : "0",
            CIP04BACHL : "1",
            CIP05ASSOC : "0",
            CIP05BACHL : "1",
            CIP09ASSOC : "0",
            CIP09BACHL : "1",
            CIP10ASSOC : "0",
            CIP10BACHL : "0",
            CIP11ASSOC : "0",
            CIP11BACHL : "1",
            CIP12ASSOC : "0",
            CIP12BACHL : "0",
            CIP13ASSOC : "0",
            CIP13BACHL : "1",
            CIP14ASSOC : "0",
            CIP14BACHL : "1",
            CIP15ASSOC : "0",
            CIP15BACHL : "0",
            CIP16ASSOC : "0",
            CIP16BACHL : "1",
            CIP19ASSOC : "0",
            CIP19BACHL : "0",
            CIP22ASSOC : "0",
            CIP22BACHL : "0",
            CIP23ASSOC : "0",
            CIP23BACHL : "1",
            CIP24ASSOC : "0",
            CIP24BACHL : "1",
            CIP25ASSOC : "0",
            CIP25BACHL : "0",
            CIP26ASSOC : "0",
            CIP26BACHL : "1",
            CIP27ASSOC : "0",
            CIP27BACHL : "1",
            CIP29ASSOC : "0",
            CIP29BACHL : "0",
            CIP30ASSOC : "0",
            CIP30BACHL : "1",
            CIP31ASSOC : "0",
            CIP31BACHL : "0",
            CIP38ASSOC : "0",
            CIP38BACHL : "1",
            CIP39ASSOC : "0",
            CIP39BACHL : "0",
            CIP40ASSOC : "0",
            CIP40BACHL : "1",
            CIP41ASSOC : "0",
            CIP41BACHL : "0",
            CIP42ASSOC : "0",
            CIP42BACHL : "1",
            CIP43ASSOC : "0",
            CIP43BACHL : "0",
            CIP44ASSOC : "0",
            CIP44BACHL : "0",
            CIP45ASSOC : "0",
            CIP45BACHL : "1",
            CIP46ASSOC : "0",
            CIP46BACHL : "0",
            CIP47ASSOC : "0",
            CIP47BACHL : "0",
            CIP48ASSOC : "0",
            CIP48BACHL : "0",
            CIP49ASSOC : "0",
            CIP49BACHL : "0",
            CIP50ASSOC : "0",
            CIP50BACHL : "1",
            CIP51ASSOC : "0",
            CIP51BACHL : "1",
            CIP52ASSOC : "0",
            CIP52BACHL : "1",
            CIP54ASSOC : "0",
            CIP54BACHL : "1"
        };

        const styles = {
           backgroundColor : 'mediumseagreen'
        };

        let data = this.props.schools;
        if(!data){
            return <p>Loading...</p>
        }
        data = data[0];
        let list = [];
        let presentedList = null;
        console.log('data', data);
        for (let key in degreeCodes) {
            if (degreeCodes[key] === "1") {
                list.push(degreeTypes[key]);
            }
        }
        presentedList = list.map((degree, index)=>{
            return (
                    <div className="degree" key={index}>{degree}</div>
            )
        });
        return (
            <div>
                <h3 className="degreeList">Degrees Offered</h3>
                <Paper className="degreePaper" style={styles}>
                    {presentedList}
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        schools: state.schools.single,
    };
}

export default connect(mapStateToProps)(degrees);
