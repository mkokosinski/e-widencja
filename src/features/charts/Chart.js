import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

import Chart from 'chart.js';
import { useState } from 'react';
import { Button } from '../layout/LayoutStyles';

Chart.defaults.lineAlt = Chart.defaults.line;

const custom = Chart.controllers.line.extend({
  draw() {
    Chart.controllers.line.prototype.draw.apply(this, arguments);
    const ctx = this.chart.chart.ctx;
    const originalStroke = ctx.stroke;
    ctx.stroke = function () {
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,50,0)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 5;
      originalStroke.apply(this, arguments);
      ctx.restore();
    };
  },
});
Chart.controllers.lineAlt = custom;

const LineChart = ({ data, dataOffset }) => {
  const [chart, setChart] = useState(null);
  const [limitedData, setLimitedData] = useState({});
  // const [paginationIndex, setPaginationIndex] = useState(0)
  const [currentOffset, setCurrentOffset] = useState(0);
  const chartRef = useRef(null);

  useEffect(() => {
    limitData(dataOffset);
  }, [chart, currentOffset]);

  useEffect(() => {
    buildChart();
  }, []);

  const buildChart = () => {
    const ctx = chartRef.current.getContext('2d');

    const chartLine = new Chart(ctx, {
      type: 'lineAlt',
      data: {},
      options: {
        layout: {
          padding: {
            left: 0,
            right: 10,
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
                color: 'rgba(0,0,0,.08)',
              },
              ticks: {
                display: true,
                fontSize: 10,
                maxTicksLimit: 4,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                // drawOnChartArea: false,
                color: 'rgba(0,0,0,.01)',
              },
              tricks: {
                display: false,
              },
            },
          ],
        },
      },
    });
    setChart(chartLine);
  };

  const limitData = (offset) => {
    if (chart) {
      const { labels, datasets } = data;
      const limitedLabels = labels.slice(currentOffset, currentOffset + offset);
      const limitedDatasets = [];

      datasets.forEach((dataset) => {
        const newDataset = {
          ...dataset,
          data: dataset.data.slice(currentOffset, currentOffset + offset),
        };
        limitedDatasets.push(newDataset);
      });

      chart.data.labels = limitedLabels;
      chart.data.datasets = limitedDatasets;
      chart.update();
    }
  };

  const nextStep = () => {
    if (currentOffset + dataOffset < data.labels.length)
      setCurrentOffset(currentOffset + dataOffset);
  };

  const previuosStep = () => {
    if (currentOffset - dataOffset >= 0)
      setCurrentOffset(currentOffset - dataOffset);
  };

  return (
    <>
      <Button onClick={previuosStep}> {'<'} </Button>
      <Button onClick={nextStep}> {'>'} </Button>
      <canvas id='lineChart' ref={chartRef}></canvas>
    </>
  );
};

export default LineChart;
