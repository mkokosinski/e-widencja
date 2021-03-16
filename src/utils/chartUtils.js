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

export const groupByYear = (items) =>
  items.reduce((acc, cur) => {
    const year = new Date(cur.date).getFullYear();
    if (acc[year]) {
      return { ...acc, [year]: [...acc[year], cur] };
    }

    return { ...acc, [year]: [cur] };
  }, {});

export const getTripsData = (trips) => {
  const groupedByYear = groupByYear(trips);

  return Object.keys(groupedByYear).reduce((acc, cur) => {
    return {
      ...acc,
      [cur]: Array.from({ length: 12 }, (v, k) => k).reduce(
        (months, curMonth) => {
          return {
            ...months,
            [curMonth]: groupedByYear[cur]
              ?.filter((trip) => {
                return getFirstDateOfMoth(trip.date).getMonth() === curMonth;
              })
              .reduce((distance, trip) => distance + trip.distance, 0),
          };
        },
        {},
      ),
    };
  }, {});
};
