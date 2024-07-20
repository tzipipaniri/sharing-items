import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Navbar from './Navbar';
import { Container, TextField, ThemeProvider, createTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import css from '../Css/Map.css'

const containerStyle = {
    width: '100vw',
    height: '100vh',
    padding: 0,
    margin: 0,
    position: 'relative'
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

function MapComponent() {

    const [location, setLocation] = useState(useParams().location)
    console.log("location", location);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk",
    });

    const [map, setMap] = React.useState(null);
    const [geocodeResults, setGeocodeResults] = React.useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState({ address: '' })



    const geocode = (location) => {
        if (!window.google)
            console.log('!window.google');
        if (!map)
            console.log('!map');
        if (!window.google || !map) return;
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: location }, (results, status) => {
            if (status === 'OK') {
                console.log("Geocoding Results:", results);
                setGeocodeResults(results[0]); 
                map.setCenter(results[0].geometry.location);
            } else {
                console.error('Geocode was not successful:', status);
            }
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        geocode(event.target.value)
    }

    useEffect(() => {
        if (isLoaded && map) {
            console.log('geocode');
            geocode(location);
        }
    }, [isLoaded, location, map]);

    const onLoad = React.useCallback((map) => {
        console.log('map', map);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(() => {
        setMap(null);
    }, []);

    const theme = createTheme({
        components: {
            MuiTypography: {
                defaultProps: {
                    variantMapping: {
                        h1: 'h2',
                        h2: 'h2',
                        h3: 'h2',
                        h4: 'h2',
                        h5: 'h2',
                        h6: 'h2',
                        subtitle1: 'h2',
                        subtitle2: 'h2',
                        body1: 'span',
                        body2: 'span',
                    },
                },
            },
        },
    });

    const handleChange = address => {
        console.log('address', address);
        setLocation(address)
    };

    const handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    return (
        <React.Fragment>
            <Navbar />
            {isLoaded && (
                <Container>
                    <ThemeProvider theme={theme}>
                        
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={geocodeResults?.geometry.location || center} 
                                zoom={10}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                            >
                                {geocodeResults && (
                                    <Marker position={geocodeResults.geometry.location} />
                                )}
                            </GoogleMap>

                    </ThemeProvider>

                </Container>
            )}

        </React.Fragment >

    );
}

export default MapComponent;
