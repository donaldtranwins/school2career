import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import {toggleMap} from '../../actions/actions_index'

class mapButton extends Component {
    handleButtonClick() {
        console.log('handleclick showMap: ', this.props.showMap);
        const mapArea = document.getElementById('mapBox');
        const schools = document.getElementById('schoolList');
        this.props.toggleMap(this.props.showMap.showMap);
        if (this.props.showMap.showMap) {
            mapArea.classList.add('hidden');
            schools.classList.remove('hidden');
        } else {
            mapArea.classList.remove('hidden');
            schools.classList.add('hidden');
        }
    }

    render() {
        const style = {
            zIndex: 50
        };

        return (
            <div>
                <RaisedButton label="Show List" style={style} secondary={true}
                              onClick={() => { this.handleButtonClick() }
                }/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        showMap: state.showMap
    }
}

export default connect(mapStateToProps, {toggleMap:toggleMap})(mapButton); //this give us access to the action creator in
//this case fetchTodos