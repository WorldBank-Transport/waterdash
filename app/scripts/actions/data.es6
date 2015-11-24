import { createAction } from 'reflux';


export const load = createAction();
export const loadProgress = createAction();
export const loadCompleted = createAction();
export const loadFailed = createAction();
