import { CALL_API } from 'redux-api-middleware'

export default (values) => ({
  [CALL_API]: {
    endpoint: `http://localhost:9090/api/search`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET',
    types: ['LOAD_SEARCH_REQUEST', 'LOAD_SEARCH_SUCCESS', 'LOAD_SEARCH_FAILURE']
  }
})