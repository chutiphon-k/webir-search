import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { Pagination } from 'react-bootstrap'
import actions from 'actions'
import styles from 'containers/Result.css'

const { getSearch } = actions

class Result extends Component {

	state = {}

	handleSelect(page) {
		let { search, sortType, limit } = this.props.location.query
		this.props.getSearch({page, search, sortType, limit })
	}

	componentWillMount(){
		if(!this.props.isFinish){
			let { search, sortType, page, limit } = this.props.location.query
			this.props.getSearch({ search, sortType, page, limit })
		}
	}

	render(){
		return (
			<div>
				<h1>Result</h1>
				<Link to={'/'}><h2>Back (เดี๋ยวเอาออกใส่ไว้งั้นแหละ)</h2></Link>
				<div>
					{
						this.props.data.map((data, index) => {
							return (
								<section key={index} className={styles.sectionResult}>
									<a href={data.url}>{data.title}</a>
									<div>{data.url}</div>
									<div dangerouslySetInnerHTML={{__html: data.snippet}}></div>
								</section>
							)
						})
					}
				</div>
				<Pagination
					prev
					next
					first
					last
					ellipsis
					boundaryLinks
					items={this.props.pagination.pageCount}
					maxButtons={5}
					activePage={this.props.pagination.pageCorrent}
					onSelect={this.handleSelect.bind(this)} />
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	data: state.search.get.data,
	pagination: state.search.get.pagination,
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