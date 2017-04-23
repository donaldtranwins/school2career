import React, { Component } from 'react';
import MapForm from './mapPageForm/formOnMapPage';
import Drawer from 'material-ui/Drawer';

import SchoolList from './main_school_list/school_list'
import PaperExampleSimple from './main_school_list/main_paper'
import AppBar from './app_bar'
import Map from './google_maps/map';

const initialCenter = {
    lng: -117.8231107,
    lat: 33.6694649
};

class drawerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }


    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    render() {
        return (
            <div>
                <AppBar/>
                <i className="material-icons searchIcon" onTouchTap={this.handleToggle}>search</i>
                <Drawer
                    docked={false}
                    width={290}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>
                    <MapForm clickClosed = {this.handleClose}/>
                </Drawer>
                <SchoolList/>
                <Map initialCenter = { initialCenter }/>
            </div>
        );
    }
}

export default drawerForm;
