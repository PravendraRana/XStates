import React, { useState, useEffect } from "react";
import { MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";

const StateSelector = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
        fetch("https://crio-location-selector.onrender.com/countries")
            .then((response) => response.json())
            .then((data) => setCountries(data))
            .catch((error) => console.error("Error fetching countries:", error));
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
                .then((response) => response.json())
                .then((data) => setStates(data))
                .catch((error) => console.error("Error fetching states:", error));
        } else {
            setStates([]);
            setCities([]);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedState) {
            fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
                .then((response) => response.json())
                .then((data) => setCities(data))
                .catch((error) => console.error("Error fetching cities:", error));
        } else {
            setCities([]);
        }
    }, [selectedState, selectedCountry]);
    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <h1>Select Location</h1>
            <Box display="flex" flexDirection="row" gap={2} p={2} maxWidth="100%" mx="auto" justifyContent="center">
                <FormControl sx={{ minWidth: 250 }}>
                    <Select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} displayEmpty>
                        <MenuItem value="" disabled>
                            <em>Select Country</em>
                        </MenuItem>
                        {countries.map((country) => (
                            <MenuItem key={country} value={country}>{country}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }} disabled={!selectedCountry}>
                    <Select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} displayEmpty>
                        <MenuItem value="" disabled>
                            <em>Select State</em>
                        </MenuItem>
                        {states.map((state) => (
                            <MenuItem key={state} value={state}>{state}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }} disabled={!selectedState}>
                    <Select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} displayEmpty>
                        <MenuItem value="" disabled>
                            <em>Select City</em>        
                        </MenuItem>
                        {cities.map((city) => (
                            <MenuItem key={city} value={city}>{city}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            {selectedCity && <h3>You selected
                <span style={{ fontSize: '24px' }}> {selectedCity}, </span>
                {selectedState}, {selectedCountry}
            </h3>}
        </Box>
    );
};

export default StateSelector;