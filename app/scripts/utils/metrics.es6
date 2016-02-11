const avg = (value, total) => (value / total);

export const metricCal = {
  'RESERVOIR_': (value) => (value / 1000000),
  'DAM_HEIGHT': avg,
  'ELEVATION_': avg,
};

export const boreholesMetricCal = {
  'DIAMETER': avg,
  'DEPTH_METER': avg,
  'STATIC_WATER_LEVEL': avg,
  'DYNAMIC_WATER_LEVEL_METER': avg,
  'DRAW _DOWN_METER': avg,
  'YIELD_METER_CUBED_PER_HOUR': avg,
};

export const boreholeMetricUnit = {
  'DIAMETER': 'mts',
  'DEPTH_METER': 'mts',
  'STATIC_WATER_LEVEL': 'mts',
  'DYNAMIC_WATER_LEVEL_METER': 'mts',
  'DRAW _DOWN_METER': 'mts',
  'YIELD_METER_CUBED_PER_HOUR': 'mts',
};

export const getDamsMetricCalc = (metric) => {
  return metricCal[metric];
};
