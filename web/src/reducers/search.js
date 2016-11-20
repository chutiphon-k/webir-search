const initialState = {
	get: {
		isFinish: false,
		status: '',
		data: []
	}
}

export default (state = initialState, action) => {
	console.log(action.payload)
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
					data: action.payload
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