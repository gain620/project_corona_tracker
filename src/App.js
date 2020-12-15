import React from 'react';

import { Cards, CountryPicker, Chart } from './components';
import { fetchData, fetchDailyDataTest } from './api/';
import styles from './App.module.css';

import image from './images/image.png';

class App extends React.Component {
  state = {
    data: {},
    country: '',
    // sw: false
  }

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchDailyDataTest(country);

    this.setState({ data, country: country });
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart newData={data} country={country} />
      </div>
    );
  }
}

export default App;