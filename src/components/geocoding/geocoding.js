import React from 'react'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

class GeoCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: '' };
        this.onChange = (address) => {
            this.setState({ address });
            this.props.onChange(address);
        };
    }
    render() {
      const cssClasses = {
        root: 'form-group', //everything  // react-places-autocomplete
        input: 'autoCompleteForm', //input is the text
        autocompleteContainer: 'autocomplete-container' //this is the container, likely pushing
        };
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
            onBlur: () => {
            },
            type: 'search',
            placeholder: 'LOCATION',
            autoFocus: true,
        };
        const options = {
            types: ['geocode'],
            componentRestrictions: {country:'us'}
        };
        return (
            <div className='placesContainer'>
                <div className='placesAuto'>
                    <PlacesAutocomplete inputProps={inputProps} classNames={cssClasses} options={options}/>
                </div>
            </div>
        )
    }
}

export default GeoCode
