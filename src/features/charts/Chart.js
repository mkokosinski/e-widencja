import React, { useCallback } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

import Chart from 'chart.js';
import { useState } from 'react';
import {
  Pagination,
  StyledChart,
  ButtonPagintation,
  Title,
  Canvas,
} from './ChartsStyles';
import { format } from 'date-fns';
import { DateFrom } from '../../utils/dateUtils';

Chart.defaults.lineAlt = Chart.defaults.line;

const custom = Chart.controllers.line.extend({
  draw() {
    Chart.controllers.line.prototype.draw.apply(this, arguments);
    const ctx = this.chart.chart.ctx;
    const originalStroke = ctx.stroke;
    ctx.stroke = function () {
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,50,0.0)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;
      originalStroke.apply(this, arguments);
      ctx.restore();
    };
  },
});
Chart.controllers.lineAlt = custom;

const LineChart = ({ title = '', data, dataOffset }) => {
  const [chart, setChart] = useState(null);
  // const [limitedData, setLimitedData] = useState({});
  // const [paginationIndex, setPaginationIndex] = useState(0)
  const [currentYear, setCurrentYear] = useState(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const chartRef = useRef(null);
  const previousButtonDisabled = currentOffset - dataOffset < 0;
  const nextButtonDisabled =
    currentOffset + dataOffset >= Object.keys(data.datasets[0].data).length;

  const buildChart = () => {
    const ctx = chartRef.current.getContext('2d');

    const chartLine = new Chart(ctx, {
      type: 'lineAlt',
      data: {},
      options: {
        layout: {
          padding: {
            left: 0,
            right: 20,
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
                maxTicksLimit: 6,
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

  const limitData = useCallback(
    (offset) => {
      if (chart && data) {
        const { labels, datasets } = data;
        const limitedLabels = labels.slice(
          currentOffset,
          currentOffset + offset
        );
        const limitedDatasets = [];
        datasets.forEach((dataset) => {
          const newDataset = {
            ...dataset,
            data: Object.values(dataset.data).slice(
              currentOffset,
              currentOffset + offset
            ),
          };
          limitedDatasets.push(newDataset);
        });

        chart.data.labels = limitedLabels;
        chart.data.datasets = limitedDatasets;
        chart.update();
      }
    },
    [chart, currentOffset, data]
  );

  const nextStep = () => {
    if (!nextButtonDisabled) setCurrentOffset(currentOffset + dataOffset);
  };

  const previuosStep = () => {
    if (!previousButtonDisabled) setCurrentOffset(currentOffset - dataOffset);
  };

  useEffect(() => {
    limitData(dataOffset);

    const dateOffset = Object.keys(data.datasets[0].data)[0 + currentOffset];
    setCurrentYear(DateFrom(dateOffset).getFullYear());
  }, [chart, currentOffset, dataOffset, limitData]);

  useEffect(() => {
    buildChart();
  }, []);

  return (
    <StyledChart>
      <Title>{title}</Title>
      <Pagination>
        <ButtonPagintation
          disabled={previousButtonDisabled}
          onClick={previuosStep}
        >
          {'<'}
        </ButtonPagintation>
        {currentYear}
        <ButtonPagintation disabled={nextButtonDisabled} onClick={nextStep}>
          {'>'}
        </ButtonPagintation>
      </Pagination>
      <Canvas id='lineChart' ref={chartRef}></Canvas>
    </StyledChart>
  );
};

export default LineChart;
