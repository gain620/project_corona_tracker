import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyDataTest } from '../../api';

import styles from './Chart.module.css';

//sw
const Chart = ({ newData, country }) => {
  const [dailyData, setDailyData] = useState({});
  const [switchButton, setSwitchButton] = useState(false);

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyDataTest("ShinMegamiTensei3");

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  // const updateChart = (
  //   newData[0] ? (

  //   ): null
  // );

  const lineChart = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ timeStamp }) => new Date(timeStamp).toLocaleDateString()),
          datasets: [{
            data: dailyData.map((data) => data.realValue),
            label: 'Tester',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: dailyData.map((data) => data.fcstValue),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          }, {
            data: dailyData.map((data) => data.threshhold),
            label: 'Recovered',
            borderColor: 'green',
            // backgroundColor: 'rgba(0, 255, 0, 0.5)',
            // fill: true,
          },
          ],
        }}
      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {newData[0] ? <Line
        data={{
          labels: newData.map(({ timeStamp }) => new Date(timeStamp).toLocaleDateString()),
          datasets: [{
            data: newData.map((data) => data.realValue),
            label: 'Tester',
            borderColor: '#3333ff',
            fill: true,
            pointRadius: 1,
            pointHoverRadius: 1
          }, {
            data: newData.map((data) => data.fcstValue),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
            pointRadius: 1,
            pointHoverRadius: 1
          }, {
            data: newData.map((data) => data.threshhold),
            label: 'Recovered',
            borderColor: 'green',
            // backgroundColor: 'rgba(0, 255, 0, 0.5)',
            // fill: true,
            pointRadius: 1,
            pointHoverRadius: 1
          },
          ],
        }}
      /> : lineChart}
    </div>
  );
};

export default Chart;
