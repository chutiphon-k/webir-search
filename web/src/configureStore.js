import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import rootReducer from 'reducers'
import { routerMiddleware } from 'react-router-redux'

export default (history) => {
	const middlewares = [thunk, apiMiddleware, routerMiddleware(history)]
	const store = createStore(
		rootReducer,
		applyMiddleware(...middlewares)
	)
	return store
}