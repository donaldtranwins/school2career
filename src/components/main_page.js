import React, { Component } from 'react';
import MapForm from './mapPageForm/formOnMapPage';
import Drawer from 'material-ui/Drawer';

import SchoolList from './main_school_list/school_list'
import PaperExampleSimple from './main_school_list/main_paper'
import AppBar from './app_bar'
import MapContainer from './google_maps/container';
import wrapper from '../GoogleApiComponent';


class drawerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    // initialCenter = { lng: -90.1056957, lat: 29.9717272 }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    render() {
        return (
            <div>
                <AppBar/>
                <i className="material-icons" onTouchTap={this.handleToggle}>search</i>
                <Drawer
                    docked={false}
                    width={290}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>
                    <MapForm clickClosed = {this.handleClose}/>
                </Drawer>
                <MapContainer/>
                <wrapper />
                {/*<SchoolList/>*/}
            </div>
        );
    }
}

export default drawerForm;
