import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from 'containers/App.css'
import { 
	logoReact,
	logoRedux,
	logoReactBoot,
	logoWebpack,
	logoBabel,
	logoExpress
} from 'assets/images'

class App extends Component {

	constructor(props){
		super(props)
		this.state = {}
	}

	render(){
		return (
			<div>
				<div>
					<h1>Headers</h1>
				</div>
				<hr />
				{this.props.children}
				<hr />
				<div>
					<div>Development By</div>
					<div>
						<img src={logoReact} className={styles.imgLogo} />
						<img src={logoRedux} className={styles.imgLogo} />
						<img src={logoReactBoot} className={styles.imgLogo} />
						<img src={logoWebpack} className={styles.imgLogo} />
						<img src={logoBabel} className={styles.imgLogo} />
						<img src={logoExpress} className={styles.imgLogo} />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)