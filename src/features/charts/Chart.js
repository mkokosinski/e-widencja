import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

import Chart from 'chart.js';
import { useState } from 'react';

Chart.defaults.lineAlt = Chart.defaults.line;

const custom = Chart.controllers.line.extend({
  draw() {
    Chart.controllers.line.prototype.draw.apply(this, arguments);
    const ctx = this.chart.chart.ctx;
    const originalStroke = ctx.stroke;
    ctx.stroke = function () {
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,50,0.3)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 5;
      originalStroke.apply(this, arguments);
      ctx.restore();
    };
  },
});
Chart.controllers.lineAlt = custom;

const LineChart = ({ data, next }) => {
  const [chart, setChart] = useState();
  const chartRef = useRef(null);

  useEffect(() => {
    buildChart();
  }, []);

  useEffect(() => {
    buildChart()
  });

  const buildChart = () => {
    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'lineAlt',
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
        scales: {
          yAxes: [
            {
              gridLines: {
                // drawOnChartArea: false,
                color: 'rgba(0,0,0,.03)',
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                // drawOnChartArea: false,
                color: 'rgba(0,0,0,.03)',
              },
              tricks: {
                display: false,
              },
            },
          ],
        },
      },
    });
  };

  const nextStep = () => {};

  return (
    <>
      <button onClick={next}> {'<'} </button>
      {/* <button> {'>'} </button> */}
      <canvas id='chartTest' ref={chartRef}></canvas>;
    </>
  );
};

export default LineChart;
