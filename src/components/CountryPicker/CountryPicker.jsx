import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchCountries, fetchHostsItems } from '../../api';

import styles from './CountryPicker.module.css';

const Countries = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };

    fetchAPI();
  }, []);

  // const [items, setItems] = useState({});

  // useEffect(() => {
  //   const fetchAPI = async () => {
  //     setItems(await fetchHostsItems("L2M"));
  //   };
  //   fetchAPI();
  // }, {});



  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="">Original</option>
        {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
      </NativeSelect>
      {/* <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="">Original2</option>
        {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
      </NativeSelect> */}
    </FormControl>
  );
};

export default Countries;
