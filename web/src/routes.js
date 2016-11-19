import React from 'react'
import {
	Router,
	Route,
	IndexRoute
} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

export default (store, history) => (
	<Router history={syncHistoryWithStore(history, store)}>
		<Route path='/' 
			getComponent = { (location, cb) => {
		        System.import('./containers/App')
		        	.then((component) => {
		            	cb(null, component.default || component)
		        	})				
			}}>
			<IndexRoute getComponent = { (location, cb) => {
		        System.import('./containers/Home')
		        	.then((component) => {
		            	cb(null, component.default || component)
			        })		
			}} />
			<Route path='result/:q' getComponent = { (location, cb) => {
		        System.import('./containers/Result')
		        	.then((component) => {
		            	cb(null, component.default || component)
			        })		
			}} />
		</Route>
	</Router>
)