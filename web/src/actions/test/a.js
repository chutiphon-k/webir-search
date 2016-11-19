import { CALL_API } from 'redux-api-middleware'

export const aaa = () => ({
  [CALL_API]: {
    endpoint: `https://jsonplaceholder.typicode.com/users`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET',
    types: ['LOAD_PAGES_REQUEST', 'LOAD_PAGES_SUCCESS', 'LOAD_PAGES_FAILURE']
  }
})