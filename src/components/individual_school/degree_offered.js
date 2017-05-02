import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

const degreeTypes = {
    deg_agri_2 : "Associate degree in Agriculture, Agriculture Operations, And Related Sciences.",
    deg_agri_4 : "Bachelor's degree in Agriculture, Agriculture Operations, And Related Sciences.",
    deg_nat_resources_2 : "Associate degree in Natural Resources And Conservation.",
    deg_nat_resources_4 : "Bachelor's degree in Natural Resources And Conservation.",
    deg_arch_2 : "Associate degree in Architecture And Related Services.",
    deg_arch_4 : "Bachelor's degree in Architecture And Related Services.",
    deg_anthro_2 : "Associate degree in Area, Ethnic, Cultural, Gender, And Group Studies.",
    deg_anthro_4 : "Bachelor's degree in Area, Ethnic, Cultural, Gender, And Group Studies.",
    deg_comm_2 : "Associate degree in Communication, Journalism, And Related Programs.",
    deg_comm_4 : "Bachelor's degree in Communication, Journalism, And Related Programs.",
    deg_comm_tech_2 : "Associate degree in Communications Technologies/Technicians And Support Services.",
    deg_comm_tech_4 : "Bachelor's degree in Communications Technologies/Technicians And Support Services.",
    deg_comp_sci_2 : "Associate degree in Computer And Information Sciences And Support Services.",
    deg_comp_sci_4 : "Bachelor's degree in Computer And Information Sciences And Support Services.",
    deg_culinary_2 : "Associate degree in Personal And Culinary Services.",
    deg_culinary_4 : "Bachelor's degree in Personal And Culinary Services.",
    deg_edu_2 : "Associate degree in Education.",
    deg_edu_4 : "Bachelor's degree in Education.",
    deg_engi_2 : "Associate degree in Engineering.",
    deg_engi_4 : "Bachelor's degree in Engineering.",
    deg_engi_tech_2 : "Associate degree in Engineering Technologies And Engineering-Related Fields.",
    deg_engi_tech_4 : "Bachelor's degree in Engineering Technologies And Engineering-Related Fields.",
    deg_linguistics_2 : "Associate degree in Foreign Languages, Literatures, And Linguistics.",
    deg_linguistics_4 : "Bachelor's degree in Foreign Languages, Literatures, And Linguistics.",
    deg_fam_cnsmr_sci_2 : "Associate degree in Family And Consumer Sciences/Human Sciences.",
    deg_fam_cnsmr_sci_4 : "Bachelor's degree in Family And Consumer Sciences/Human Sciences.",
    deg_legal_2 : "Associate degree in Legal Professions And Studies.",
    deg_legal_4 : "Bachelor's degree in Legal Professions And Studies.",
    deg_english_2 : "Associate degree in English Language And Literature/Letters.",
    deg_english_4 : "Bachelor's degree in English Language And Literature/Letters.",
    deg_humanities_2 : "Associate degree in Liberal Arts And Sciences, General Studies And Humanities.",
    deg_humanities_4 : "Bachelor's degree in Liberal Arts And Sciences, General Studies And Humanities.",
    deg_library_sci_2 : "Associate degree in Library Science.",
    deg_library_sci_4 : "Bachelor's degree in Library Science.",
    deg_biol_sci_2 : "Associate degree in Biological And Biomedical Sciences.",
    deg_biol_sci_4 : "Bachelor's degree in Biological And Biomedical Sciences.",
    deg_math_2 : "Associate degree in Mathematics And Statistics.",
    deg_math_4 : "Bachelor's degree in Mathematics And Statistics.",
    deg_military_2 : "Associate degree in Military Technologies And Applied Sciences.",
    deg_military_4 : "Bachelor's degree in Military Technologies And Applied Sciences.",
    deg_multi_2 : "Associate degree in Multi/Interdisciplinary Studies.",
    deg_multi_4 : "Bachelor's degree in Multi/Interdisciplinary Studies.",
    deg_parks_rec_2 : "Associate degree in Parks, Recreation, Leisure, And Fitness Studies.",
    deg_parks_rec_4 : "Bachelor's degree in Parks, Recreation, Leisure, And Fitness Studies.",
    deg_phil_religion_2 : "Associate degree in Philosophy And Religious Studies.",
    deg_phil_religion_4 : "Bachelor's degree in Philosophy And Religious Studies.",
    deg_theology_2 : "Associate degree in Theology And Religious Vocations.",
    deg_theology_4 : "Bachelor's degree in Theology And Religious Vocations.",
    deg_phys_sci_2 : "Associate degree in Physical Sciences.",
    deg_phys_sci_4 : "Bachelor's degree in Physical Sciences.",
    deg_sci_tech_2 : "Associate degree in Science Technologies/Technicians.",
    deg_sci_tech_4 : "Bachelor's degree in Science Technologies/Technicians.",
    deg_psych_2 : "Associate degree in Psychology.",
    deg_psych_4 : "Bachelor's degree in Psychology.",
    deg_law_enf_secur_2 : "Associate degree in Homeland Security, Law Enforcement, Firefighting And Related Protective Services.",
    deg_law_enf_secur_4 : "Bachelor's degree in Homeland Security, Law Enforcement, Firefighting And Related Protective Services.",
    deg_pub_adm_soc_serv_2 : "Associate degree in Public Administration And Social Service Professions.",
    deg_pub_adm_soc_serv_4 : "Bachelor's degree in Public Administration And Social Service Professions.",
    deg_soc_sci_2 : "Associate degree in Social Sciences.",
    deg_soc_sci_4 : "Bachelor's degree in Social Sciences.",
    deg_construction_2 : "Associate degree in Construction Trades.",
    deg_construction_4 : "Bachelor's degree in Construction Trades.",
    deg_mechanic_2 : "Associate degree in Mechanic And Repair Technologies/Technicians.",
    deg_mechanic_4 : "Bachelor's degree in Mechanic And Repair Technologies/Technicians.",
    deg_precision_prod_2 : "Associate degree in Precision Production.",
    deg_precision_prod_4 : "Bachelor's degree in Precision Production.",
    deg_transportation_2 : "Associate degree in Transportation And Materials Moving.",
    deg_transportation_4 : "Bachelor's degree in Transportation And Materials Moving.",
    deg_vis_perf_arts_2 : "Associate degree in Visual And Performing Arts.",
    deg_vis_perf_arts_4 : "Bachelor's degree in Visual And Performing Arts.",
    deg_health_2 : "Associate degree in Health Professions And Related Programs.",
    deg_health_4 : "Bachelor's degree in Health Professions And Related Programs.",
    deg_bus_mktg_mgmt_2 : "Associate degree in Business, Management, Marketing, And Related Support Services.",
    deg_bus_mktg_mgmt_4 : "Bachelor's degree in Business, Management, Marketing, And Related Support Services.",
    deg_history_2 : "Associate degree in History.",
    deg_history_4 : "Bachelor's degree in History."
};


class degrees extends Component {

    render() {
        const  degreeCodes = {
            deg_01_2 : "0",
            deg_01_4 : "0",
            deg_03_2 : "0",
            deg_03_4 : "1",
            deg_04_2 : "0",
            deg_04_4 : "1",
            deg_05_2 : "0",
            deg_05_4 : "1",
            deg_09_2 : "0",
            deg_09_4 : "1",
            deg_10_2 : "0",
            deg_10_4 : "0",
            deg_11_2 : "0",
            deg_11_4 : "1",
            deg_12_2 : "0",
            deg_12_4 : "0",
            deg_13_2 : "0",
            deg_13_4 : "1",
            deg_14_2 : "0",
            deg_14_4 : "1",
            deg_15_2 : "0",
            deg_15_4 : "0",
            deg_16_2 : "0",
            deg_16_4 : "1",
            deg_19_2 : "0",
            deg_19_4 : "0",
            deg_22_2 : "0",
            deg_22_4 : "0",
            deg_23_2 : "0",
            deg_23_4 : "1",
            deg_24_2 : "0",
            deg_24_4 : "1",
            deg_25_2 : "0",
            deg_25_4 : "0",
            deg_26_2 : "0",
            deg_26_4 : "1",
            deg_27_2 : "0",
            deg_27_4 : "1",
            deg_29_2 : "0",
            deg_29_4 : "0",
            deg_30_2 : "0",
            deg_30_4 : "1",
            deg_31_2 : "0",
            deg_31_4 : "0",
            deg_38_2 : "0",
            deg_38_4 : "1",
            deg_39_2 : "0",
            deg_39_4 : "0",
            deg_40_2 : "0",
            deg_40_4 : "1",
            deg_41_2 : "0",
            deg_41_4 : "0",
            deg_42_2 : "0",
            deg_42_4 : "1",
            deg_43_2 : "0",
            deg_43_4 : "0",
            deg_44_2 : "0",
            deg_44_4 : "0",
            deg_45_2 : "0",
            deg_45_4 : "1",
            deg_46_2 : "0",
            deg_46_4 : "0",
            deg_47_2 : "0",
            deg_47_4 : "0",
            deg_48_2 : "0",
            deg_48_4 : "0",
            deg_49_2 : "0",
            deg_49_4 : "0",
            deg_50_2 : "0",
            deg_50_4 : "1",
            deg_51_2 : "0",
            deg_51_4 : "1",
            deg_52_2 : "0",
            deg_52_4 : "1",
            deg_54_2 : "0",
            deg_54_4 : "1"
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
