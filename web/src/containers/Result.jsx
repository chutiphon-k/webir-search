import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import actions from 'actions'
import { connect } from 'react-redux'

const { aaa } = actions

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
				<pre>
					{JSON.stringify(this.props.test, null, 2)}
				</pre>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	test: state.test
})

const mapDispatchToProps = {
	aaa: () => aaa()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result)