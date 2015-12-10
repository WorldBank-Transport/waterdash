import isUndefined from 'lodash/lang/isUndefined';
import topojson from 'topojson';
import { Ok, Err } from 'results';
import warn from '../warn';
import { Result } from '../functional';
import { fetchAndCheck } from './http';


export const pullFeatures = topoKey => data => {
  const { features } = topojson.feature(data, data.objects[topoKey]);
  return features;
};


export const useNamePropAsId = feature => {
  if (isUndefined(feature.properties.name)) {
    warn(`Feature is missing 'name' in 'properties': ${JSON.stringify(feature)}`);
    return Err(['error.api.static.postprocess']);
  } else {
    return Ok({
      ...feature,
      id: feature.properties.name.toUpperCase(),  // match casing of data
    });
  }
};


export const mapNamePropsAsIds = features =>
  Result.map(useNamePropAsId, features)
    .promise();


export const get = path =>
  fetchAndCheck(path);


export const getJson = path =>
  get(path)
    .then(resp => resp.json());


export const getPolygons = (path, topoKey) =>
  getJson(path)
    .then(pullFeatures(topoKey))
    .then(mapNamePropsAsIds);

export const getWithPostProcess = (path, postprocess) =>
  getJson(path)
    .then(postprocess);
