import { combineReducers } from 'redux'
import { routerReducer  } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import search from 'reducers/search'

export default combineReducers({
	routing: routerReducer,
	form: formReducer,
	search
})