import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

import Chart from 'chart.js';

const LineChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        layout: {
          padding: {
            left: 10,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        legend: false,
      },
    });
  }, []);

  return <canvas id='chartTest' ref={chartRef}></canvas>;
};

export default LineChart;
