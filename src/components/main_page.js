import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';

import MapForm from './mapPageForm/formOnMapPage';
import SchoolList from './main_school_list/school_list'
import PaperExampleSimple from './main_school_list/main_paper'
import Map from './google_maps/map';
import MapButton from './button_legend/legend';

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
                <div className="refineBox" onTouchTap={this.handleToggle}>
                    <div className="searchIcon refineText">
                        <i className="material-icons searchIcon" >search</i>
                    </div>
                </div>
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
                <div className='mapContent'>
                    <Map id="mapShowing"/>
                    <SchoolList id="schoolListShowing"/>
                </div>
            </div>
        );
    }
}



export default drawerForm;
