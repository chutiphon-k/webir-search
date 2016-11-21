import { CALL_API } from 'redux-api-middleware'
import { push } from 'react-router-redux'

export default (values) => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `http://localhost:9090/api/search2?q=${values.search}`,
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
						dispatch(push(`/result?q=${values.search}`))
						return data
					})
	            }
			},
			'LOAD_SEARCH_FAILURE'
	    ]
	}
})