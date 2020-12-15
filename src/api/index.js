import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};


// Instead of Global, it fetches the daily data for the US
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');

    return data.map(({ positive, recovered, death, dateChecked: date }) => ({ confirmed: positive, recovered, deaths: death, date }));
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const { data: { countries } } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};


export const fetchHostsItems = async (svcName) => {
  try {
    let axiosConfig = {
      // withCredentials: true,
      headers: {
        // 'Content-Type': 'application/json;charset=UTF-8',
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    };
    const { data } = await axios.post(`http://localhost:9000/list/items/`, [], axiosConfig);

    return data;
  } catch (error) {
    return error;
  }
};


// Instead of Global, it fetches the daily data for the US
export const fetchDailyDataTest = async (mesName) => {
  try {
    let form = new FormData()
    form.append('svcName', "coupang_price")
    form.append('hostName', mesName)

    let axiosConfig = {
      // withCredentials: true,
      headers: {
        // 'Content-Type': 'application/json;charset=UTF-8',
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    };
    // 13.125.114.137
    const { data } = await axios.post("http://localhost:9000/graph/test", form, axiosConfig);
    const { Items } = data;

    return Items.map(({ realValue, fcstValue, timeStamp, threshhold }) => ({ realValue, fcstValue, timeStamp, threshhold }));
  } catch (error) {
    return error;
  }
};