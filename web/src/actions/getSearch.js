import { CALL_API } from 'redux-api-middleware'
import { push } from 'react-router-redux'

export default ({ search, sortType='similarity', page=1, limit=10 }) => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `http://localhost:9090/api/search?search=${search}&sortType=${sortType}&page=${page}&limit=${limit}`,
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		method: 'GET',
		types: [
			'LOAD_SEARCH_REQUEST',
			{
	            type: 'LOAD_SEARCH_SUCCESS',
	            payload: (action, state, res) => {
					return res.json().then((data) => {
						dispatch(push(`/result?search=${search}&sortType=${sortType}&page=${page}&limit=${limit}`))
						return data
					})
	            }
			},
			'LOAD_SEARCH_FAILURE'
	    ]
	}
})