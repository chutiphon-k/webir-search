import React, { Component } from 'react'
import styles from 'containers/App.css'

export default class App extends Component {
	render(){
		return(
			<div>
				<h1><div>App</div></h1>
				<div className={styles.abc}>aa</div>
				{ this.props.children }
			</div>
		)
	}
}