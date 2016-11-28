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
			<div className={styles.container} >
				{this.props.children}
				<div>
					<br /><br /><br /><br />
					<label className="comment">Development By</label>
					<div>
						<img src={logoReact} className={styles.logoDev} />
						<img src={logoRedux} className={styles.logoDev} />
						<img src={logoReactBoot} className={styles.logoDev} />
						<img src={logoWebpack} className={styles.logoDev} />
						<img src={logoBabel} className={styles.logoDev} />
						<img src={logoExpress} className={styles.logoDev} />
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