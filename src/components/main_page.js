import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';

import MapForm from './mapPageForm/formOnMapPage';
import SchoolList from './main_school_list/school_list'
import Map from './google_maps/map';



class drawerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    render() {
        const style = {
            marginLeft: '4.5%',
            marginBottom: '7px'
        };
        return (
            <div className='mainPage'>
                <Drawer
                    docked={false}
                    width={290}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>
                    <MapForm clickClosed = {this.handleClose}/>
                </Drawer>
                <div className='searchImgDiv'>
                    <div className="jumboImg" />
                </div>
                <RaisedButton onTouchTap={this.handleToggle} className='refineSearch' label="Refine Search" style={style} />
                <div className='mapContent'>
                    <Map id="mapShowing"/>
                    <SchoolList />
                </div>
            </div>
        );
    }
}



export default drawerForm;
