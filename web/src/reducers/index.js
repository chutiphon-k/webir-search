import { combineReducers } from 'redux'
import test from 'reducers/test'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
	routing: routerReducer,
	test
})