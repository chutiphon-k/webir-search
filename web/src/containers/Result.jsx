import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import actions from 'actions'
import styles from 'containers/Result.css'

const { getSearch } = actions

class Result extends Component {

	constructor(props){
		super(props)
		this.state = {}
	}

	componentWillMount(){
		if(!this.props.isFinish){
			this.props.getSearch({search: this.props.location.query.q})
		}
	}

	render(){
		return (
			<div>
				<h1>Result</h1>
				<Link to={'/'}><h2>Back (เดี๋ยวเอาออกใส่ไว้งั้นแหละ)</h2></Link>
				<div>
					{
						this.props.datas.map((data, index) => {
							return (
								<section key={index} className={styles.sectionResult}>
									<a href={data.url}>{data.title}</a>
									<div>{data.url}</div>
									<div>{data.snippet}</div>
								</section>
							)
						})
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	datas: state.search.get.datas,
	isFinish: state.search.get.isFinish
})

const mapDispatchToProps = {
	redirectToHome: () => push('/'),
	getSearch: (values) => getSearch(values)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result)