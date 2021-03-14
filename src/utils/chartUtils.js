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

export const fillDatasets = (datasets, labels) => {
  console.log(datasets[0].data);
};

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

  const test = Object.keys(groupedByYear).reduce((acc, cur) => {
    return {
      ...acc,
      [cur]: Array.from({ length: 12 }, (v, k) => k).reduce(
        (months, curMonth) => {
          return { ...months, [curMonth]: curMonth };
        },
        {},
      ),
    };
  }, {});

  console.log(test);

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
