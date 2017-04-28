import React, {Component} from 'react';
import Slider from 'material-ui/Slider';

/**
 * The slider bar specifically for distance on the map_page form
 */

class tuitionRangeSlider extends Component {
    state = {
        tuitionSlider: 10000,
    };

    handleTuitionSlider = (event, value) => {
        this.setState({tuitionSlider: value});
    };


    render() {

        const sliderStyle = {
            width: 250
        };

        return (
            <div>
                <p>
                    <span>{'Tuition: '}</span>
                    <span>${this.state.tuitionSlider}</span>
                </p>
                <Slider
                    style = {sliderStyle}
                    min={0}
                    max={80000}
                    step={1000}
                    defaultValue={10000}
                    value={this.state.tuitionSlider}
                    onChange={this.handleTuitionSlider}
                />
            </div>
        );
    }
}

export default tuitionRangeSlider;