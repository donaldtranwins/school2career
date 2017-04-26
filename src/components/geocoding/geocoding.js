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
        input: 'form-control landingForm', //input is the text
        autocompleteContainer: 'autocomplete-container' //this is the container, likely pushing
    };
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      onBlur: () => {
      },
      type: 'search',
      placeholder: 'Search Places...',
      autoFocus: true,
    };
    return (
        <PlacesAutocomplete inputProps={inputProps} classNames={cssClasses} />
    )
  }
}

export default GeoCode
