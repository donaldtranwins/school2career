import React, { Component } from 'react';
import MapForm from './mapPageForm/formOnMapPage';
import Drawer from 'material-ui/Drawer';
import AppBar from './app_bar';
import SchoolList from './main_school_list/school_list'

class drawerForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }


    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    render() {
        return (
            <div>
                <i className="material-icons">search</i>
                <Drawer
                    docked={false}
                    width={290}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>
                    <MapForm />
                </Drawer>
                <SchoolList/>
            </div>
        );
    }
}

export default drawerForm;
