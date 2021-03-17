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
import { createLineChart } from '../../utils/chartUtils';

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

const LineChart = ({ title = '', data }) => {
  const [chart, setChart] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const chartRef = useRef(null);
  const chartData = data.datasets[0];
  const labels = data.labels;

  const dataLength = Object.keys(data.datasets[0].data).length;
  const previousButtonDisabled = !chartData.data[selectedYear - 1];
  const nextButtonDisabled = !chartData.data[selectedYear + 1];

  const buildChart = () => {
    const ctx = chartRef.current.getContext('2d');
    const chartLine = createLineChart(ctx);
    setChart(chartLine);
  };

  const limitData = useCallback(() => {
    if (chart && chartData.data[selectedYear]) {
      const newDataset = {
        ...chartData,
        data: Object.values(chartData.data[selectedYear]),
      };

      chart.data.labels = labels;
      chart.data.datasets = [newDataset];
      chart.update();
    }
  }, [chart, chartData, selectedYear, labels]);

  const nextStep = () => {
    if (!nextButtonDisabled) setSelectedYear(selectedYear + 1);
  };

  const previuosStep = () => {
    if (!previousButtonDisabled) setSelectedYear(selectedYear - 1);
  };

  useEffect(() => {
    limitData();
  }, [chart, limitData]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setSelectedYear(currentYear);
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
        {dataLength > 0 ? selectedYear : 'Brak przejazdów'}
        <ButtonPagintation disabled={nextButtonDisabled} onClick={nextStep}>
          {'>'}
        </ButtonPagintation>
      </Pagination>
      <Canvas id='lineChart' ref={chartRef}></Canvas>
    </StyledChart>
  );
};

export default LineChart;
