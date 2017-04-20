import React, { Component } from 'react';
import MapForm from './formOnMapPage';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';



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
                <RaisedButton
                    label="Open Drawer"
                    onTouchTap={this.handleToggle}
                />
                <Drawer
                    docked={false}
                    width={290}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>
                    <MapForm />
                </Drawer>
            </div>
        );
    }
}

export default drawerForm;