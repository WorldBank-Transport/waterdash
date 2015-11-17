export const metricCal = {
  'DAM_HEIGHT': (value, total) => (value / total),
  'ELEVATION_': (value, total) => (value / total),
  'RESERVOIR_': (value) => (value / 1000000),
};

export const metricUnit = {
  'DAM_HEIGHT': 'mts',
  'ELEVATION_': 'mts',
  'RESERVOIR_': 'M mts3',
};

export const getDamsMetricCalc = (metric) => {
  return metricCal[metric];
};

export const getDamsMetricUnit = (metric) => {
  return metricUnit[metric];
};
