import { createHashHistory, useQueries } from 'history';

// enable querystring serialization/deserialization
const history = useQueries(createHashHistory)();

export default history;
