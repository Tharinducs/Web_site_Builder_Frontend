import React, { Component } from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import styles from "./PlacesAutoComplete.module.css";


class PlacesAutoComplete extends Component {

    constructor(props) {
        super(props);

        this.state = {
            address: props.value?.address || ""
        };
    }

    componentDidMount() {
        this.setState({ address: this.props.value?.address || "" })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            this.setState({ address: this.props.value.address || "" })
        }

    }

    handleChange = address => {
        this.setState(() => {
            return { address };
        });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState(() => {
                    this.props.setFieldValue(this.props.name, JSON.stringify({
                        value: address,
                        address,
                        coordinates: latLng
                    }));
                    this.props.setLat(latLng.lat);
                    this.props.setLng(latLng.lng)
                    return { address };
                });
            })
            .catch(error => console.log("errrr", error));
    };


    render() {
        const {
            name,
            value
        } = this.props;

        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: "Search Places ...",
                                className: "location-search-input form-control"
                            })}
                        />
                        <div className={`autocomplete-dropdown-container ${styles.formInputL}`}>
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion, index) => {
                                const className = suggestion.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style
                                        })}
                                        key={index}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}


export default PlacesAutoComplete;