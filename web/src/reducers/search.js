const initialState = {
	get: {
		isFinish: false,
		status: '',
		data: [],
		pagination: {}
	}
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'LOAD_SEARCH_REQUEST':
			return {
				...initialState,
				get: {
					...initialState.get,
					isFinish: false,
					status: '...Loading'
				}
			}
		case 'LOAD_SEARCH_SUCCESS':
			return {
				...initialState,
				get: {
					...initialState.get,
					isFinish: true,
					status: 'Success',
					data: action.payload.data,
					pagination: action.payload.pagination
				}
			}
		case 'LOAD_SEARCH_FAILURE':
			return {
				...initialState,
				get: {
					...initialState.get,
					isFinish: false,
					status: 'Error'
				}
			}
		default:
			return state
	}
}