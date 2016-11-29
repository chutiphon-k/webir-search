import { CALL_API } from 'redux-api-middleware'
import { push } from 'react-router-redux'

export default ({ search, filter, page, limit , alpha }) => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `http://chutiphon-k.info:9090/api/search?search=${search}${(filter)? `&filter=${filter}`:''}${(filter == 'rerank')? `&alpha=${alpha}`:''}${(page)? `&page=${page}`:''}${(limit)? `&limit=${limit}`:''}`,
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
						dispatch(push(`/result?search=${search}${(filter)? `&filter=${filter}`:''}${(filter == 'rerank')? `&alpha=${alpha}`:''}${(page)? `&page=${page}`:''}${(limit)? `&limit=${limit}`:''}`))
						return data
					})
	            }
			},
			'LOAD_SEARCH_FAILURE'
	    ]
	}
})