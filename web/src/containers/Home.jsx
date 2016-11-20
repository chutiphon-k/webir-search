import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import actions from 'actions'
import styles from 'containers/Home.css'
import { imgPony1 } from 'assets/images'

const FIELDS = ['query', 'isRanking']
const { getSearch } = actions

class Home extends Component {

	constructor(props){
		super(props)
		this.state = {}
	}

	render(){
		const { fields, handleSubmit } = this.props
		return (
			<div>
				<h1>ม้าโพนี่มหัศจรรย์<img src={imgPony1} className={styles.imgLogo} /></h1>
			    <form onSubmit={handleSubmit} className='form' action='javascript:void(0)'>
			        <div>
						<Field name="search" component="input" type="text" />
						{' '}
						<button
					    	type='submit'
					        className='button'>
					        Search
				      </button>
			        </div>
			    </form>
			</div>
		)
	}
}

const validate = values => {
	const errors = {}
	if (!values.search || values.search == '') {
    	errors.search = 'Required'
	}
	return errors
}

Home = reduxForm({
	form: 'home',
	validate
})(Home)

const selector = formValueSelector('home')

const mapStateToProps = (state) => ({
	searchText: selector(state, 'search'),
	data: state.search.get.data
})

const mapDispatchToProps = {
	onSubmit: getSearch
}

Home = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)

export default Home