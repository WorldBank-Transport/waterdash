import topojson from 'topojson';
import { fetchAndCheck } from './http';


export const pullFeatures = topoKey => data => {
  const { features } = topojson.feature(data, data.objects[topoKey]);
  return features;
};


export const get = path =>
  fetchAndCheck(path);


export const getJson = path =>
  get(path)
    .then(resp => resp.json());


export const getPolygons = (path, topoKey) =>
  getJson(path)
    .then(pullFeatures(topoKey));
