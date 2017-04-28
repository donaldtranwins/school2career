import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import {toggleMap} from '../../actions/actions_index'

class mapButton extends Component {
    handleButtonClick() {
        const mapArea = document.getElementById('mapBox');
        const schools = document.getElementById('schoolList');
        const mainButton = document.getElementById('showHideButton');
        this.props.toggleMap(this.props.showMap.showMap);
        if (this.props.showMap.showMap) {
            mapArea.classList.add('hidden');
            schools.classList.remove('hidden');
            mainButton.innerHTML = 'Show Map';
        } else {
            mapArea.classList.remove('hidden');
            schools.classList.add('hidden');
            mainButton.innerHTML = 'Show List';

        }
    }

    render() {
        const style = {
            zIndex: 50,
            position: "relative",
            left: '72%',
            marginTop: 25,
            fontColor: 'white'
        };

        return (
            <div>
                <RaisedButton
                    id="showHideButton"
                    style={style}
                    secondary={true}
                    onClick={() => { this.handleButtonClick() }}>
                    Show List
                </RaisedButton>
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