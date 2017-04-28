import React, { Component } from 'react';
import { connect } from 'react-redux';

const degreeTypes = {
    CIP01ASSOC : "Associate degree in Agriculture, Agriculture Operations, And Related Sciences.",
    CIP01BACHL : "Bachelor's degree in Agriculture, Agriculture Operations, And Related Sciences.",
    CIP03ASSOC : "2 year Natural Resources",
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

        let data = this.props.schools;
        if(!data){
            return <p>Loading...</p>
        }
        data = data[0];
        console.log('data', data);
        for (let key in degreeCodes) {
            console.log('key', key, 'value', degreeCodes[key]);
        }
        return (
            <div>

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