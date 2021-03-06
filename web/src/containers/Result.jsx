import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { Pagination } from 'react-bootstrap'
import actions from 'actions'
import styles from 'containers/Result.css'
import _ from 'lodash'

const { getSearch } = actions

class Result extends Component {

	state = {}

	setMarker(snippet){
		let mark = _.wrap(_.escape, (func, text) => {
			return '<mark>' + func(text) + '</mark>'
		})
		let search = this.props.location.query.search.toLowerCase()
	    let splitQuery = search.split(/(\s+)/).filter((str) => str.trim().length > 0 )
	    splitQuery.map((value) => {
			let indexQuery = (snippet.toLowerCase()).indexOf(value)
			while(indexQuery != -1){
				snippet = snippet.substring(0,indexQuery) + mark(snippet.substring(indexQuery, indexQuery + value.length)) + snippet.substring(indexQuery + value.length)
				indexQuery = (snippet.toLowerCase()).indexOf(value, indexQuery + value.length + '<mark>'.length*2 + 1)
			}
	    })
		return snippet
	}

	handleSelect(page) {
		this.props.getSearch({...this.props.location.query, page})
	}

	componentWillMount(){
		if(!this.props.isFinish){
			this.props.getSearch(this.props.location.query)
		}
	}

	render(){
		return (
			<div>
				<h1>Result</h1>
				<Link to={'/'}><button className='backbutton'>Back</button></Link>
				<hr />
				<div className="result">
					{
						this.props.data.map((data, index) => {
							return (
								<div key={index+100}>
									<section className={styles.sectionResult}>
										<a href={data.url}>
											{
												(data.title) ? data.title.substring(0, 50).concat(((data.title.length > 50) ? '｡｡｡':'')) : '[BOT] No Title'
											}
										</a>
										<div>{data.url}</div>
	                                    <div dangerouslySetInnerHTML={{__html: this.setMarker(data.snippet)}} />
	                                    <div style={{color:'red'}}>
											{
												(data.missing.length > 0) && 'Missing : '
											}
											{
	                                    		data.missing.map((value, index) => {
	                                    			return(
	                                    				<span key={index+1000}>
		                                    				<span dangerouslySetInnerHTML={{__html: `<strike>${value}</strike>`}} />
		                                    				{' '}
	                                    				</span>
	                                    			)
	                                    		})
	                                    	}
	                                    </div>
									</section>
									<hr />
								</div>
							)
						})
					}
				</div>
				<br /><br /> 
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