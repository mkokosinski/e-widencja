import { getFirstDateOfMoth } from './dateUtils';

export const createLineChart = (context) =>
  new Chart(context, {
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

export const getTripsData = (trips) => {
  const groupedTrips = trips.reduce((acc, cur) => {
    const monthYear = getFirstDateOfMoth(cur.date);
    if (acc[monthYear]) {
      return { ...acc, [monthYear]: acc[monthYear] + cur.distance };
    } else {
      return { ...acc, [monthYear]: cur.distance };
    }
  }, {});

  return groupedTrips;
};
