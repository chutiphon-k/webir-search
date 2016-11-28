const initialState = {
	get: {
		isFinish: false,
		status: '',
		data: [],
		pagination: {}
	}
}

export default (state = initialState, action) => {
	console.log(state)
	switch(action.type) {
		case 'LOAD_SEARCH_REQUEST':
			return {
				...state,
				get: {
					...state.get,
					isFinish: false,
					status: '...Loading'
				}
			}
		case 'LOAD_SEARCH_SUCCESS':
			return {
				...state,
				get: {
					...state.get,
					isFinish: true,
					status: 'Success',
					data: action.payload.data,
					pagination: action.payload.pagination
				}
			}
		case 'LOAD_SEARCH_FAILURE':
			return {
				...state,
				get: {
					...state.get,
					isFinish: false,
					status: 'Error'
				}
			}
		default:
			return state
	}
}