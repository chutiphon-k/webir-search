import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'configureStore'
import routes from 'routes'
import { browserHistory } from 'react-router'

const store = configureStore(browserHistory)

export default () => (
	<Provider store={store} key='provider'>
		{routes(store, browserHistory)}
	</Provider>
)