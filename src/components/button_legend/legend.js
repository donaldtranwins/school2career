import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import {toggleMap} from '../../actions/actions_index';

class mapButton extends Component {
    //created a check for a button that would allow a toggle between just the list view and just
    //the google map.
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

//this allows us to pass props into the component. Here we have the value of showMap
function mapStateToProps(state) {
    return {
        showMap: state.showMap
    }
}

//this connects us to the redux store, it connects both the state and specific actions in this case togglemap
export default connect(mapStateToProps, {toggleMap:toggleMap})(mapButton);
