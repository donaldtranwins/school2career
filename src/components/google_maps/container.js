import React, { Component } from 'react';
import GoogleApiComponent from '../../GoogleApiComponent';
import Map from './map';

export class Container extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const style = {
            width: '300px',
            height: '300px',
            border: '1px solid black'
        };


        if (!this.props.loaded) {
            return <div>Loading...</div>
        }

        return (
            <div style={style}>
                <Map google={this.props.google}/>
            </div>
        )
    }
}

export default GoogleApiComponent({
    apiKey: "AIzaSyArlDXqU-yucZFT0nUmuuZB9DcPIkE8A5g"
})(Container)