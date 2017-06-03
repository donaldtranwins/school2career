import React from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

class GeoCode extends React.Component {
    //created state to track the address for geocoding. this updates on change within the auto complete box
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
        //allows country restrictions and other options based on what google maps will allow
        const options = {
            types: ['geocode'],
            componentRestrictions: {country:'us'}
        };
        // returns out the autocomplete box to be placed on forms
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
