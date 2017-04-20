import React, { Component } from 'react';
import MapForm from './mapPageForm/formOnMapPage';
import Drawer from 'material-ui/Drawer';
import AppBar from './app_bar';

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
                <div>Refine Search</div>
                <i className="material-icons" onTouchTap={this.handleToggle}>search</i>
                <Drawer
                    docked={false}
                    width={290}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>
                    <MapForm clickClosed = {()=>{this.handleClose}}/>
                </Drawer>
            </div>
        );
    }
}

export default drawerForm;