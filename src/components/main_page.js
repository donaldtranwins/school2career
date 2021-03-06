import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import MapForm from './mapPageForm/formOnMapPage';
import SchoolList from './main_school_list/school_list';
import Map from './google_maps/map';

class drawerForm extends Component {

    //state is defined here to handle the Drawer from material UI to be shown as open or closed.
    constructor(props) {
        super(props);
        this.state = {open: false};
    }
    //these functions set the state based on the drawer being open or closed.
    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = () => this.setState({open: false});

    render() {
        const style = {
            marginLeft: '5%',
            marginBottom: '7px',
            fontWeight: 300
        };
        //this render creates the search school page, including the header image, drawer, refine search button
        //and the map.
        return (
            <div>
                <div className='searchImgDiv'>
                    <div className="jumboImg" />
                </div>
                <RaisedButton onTouchTap={this.handleToggle} className='refineSearch' label="Refine Search" style={style} />
                <div className='mainPage'>
                    <Drawer
                        docked={false}
                        width={290}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}>
                        <MapForm clickClosed = {this.handleClose}/>
                    </Drawer>
                    <div className='mapContent'>
                        <Map id="mapShowing"/>
                        <SchoolList handleToggle = {this.handleToggle} />
                    </div>
                </div>
            </div>
        );
    }
}
export default drawerForm;
