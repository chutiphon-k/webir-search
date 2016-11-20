import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import actions from 'actions'
import styles from 'containers/Result.css'

const { getSearch } = actions

class Result extends Component {

	constructor(props){
		super(props)
		this.state = {}
	}

	componentWillMount(){
		this.props.aaa()
	}

	render(){
		return (
			<div>
				<h1>Result</h1>
				<h1>{this.props.params.q}</h1>
				<Link to={'/'}><h2>Home</h2></Link>
				<pre>
					{JSON.stringify(this.props.search, null, 2)}
				</pre>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	test: state.search
})

const mapDispatchToProps = {
	aaa: () => getSearch()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result)