import React from 'react';
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
        root: 'form-group',
        input: 'autoCompleteForm',
        autocompleteContainer: 'autocomplete-container'
        };
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
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
                    <PlacesAutocomplete inputProps={inputProps} classNames={cssClasses} options={options} />
                </div>
            </div>
        )
    }
}

export default GeoCode
