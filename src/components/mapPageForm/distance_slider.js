import React, {Component} from 'react';
import Slider from 'material-ui/Slider';

/**
 * The slider bar specifically for distance on the map_page form
 */

class distanceRangeSlider extends Component {
    state = {
        distanceSlider: 40,
    };

    handleDistanceSlider = (event, value) => {
        this.setState({distanceSlider: value});
    };


    render() {

        const sliderStyle = {
            width: 250
        };

        return (
            <div>
                <p>
                    <span>{'Distance: '}</span>
                    <span>{this.state.distanceSlider} miles</span>
                </p>
                <Slider
                    style = {sliderStyle}
                    min={0}
                    max={300}
                    step={1}
                    defaultValue={40}
                    value={this.state.distanceSlider}
                    onChange={this.handleDistanceSlider}
                />
            </div>
        );
    }
}

export default distanceRangeSlider;