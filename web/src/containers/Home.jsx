import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import actions from 'actions'
import styles from 'containers/Home.css'
import { imgPony1 } from 'assets/images'

const { getSearch } = actions

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>{' '}
	<input {...input} placeholder={label} type={type} />
	<br />
	{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)

class Home extends Component {

    state = {}

	render(){
		const { fields, handleSubmit } = this.props
		return (
			<div>
				<h1>Miracle of Pony Search</h1>
				<img src={imgPony1} className={styles.logo} />
			    <form onSubmit={handleSubmit} className='form' action='javascript:void(0)'>
					<Field name="search" component="input" type="text" />
					<Field name="filter" component="select">
						<option value="rerank">Rerank</option>
						<option value="similarity">Similarity</option>
						<option value="pagerank">PageRank</option>
					</Field>
					<br />
					{ 
						(this.props.filter == 'rerank') && 
						<div>
							<Field name="alpha" component={renderField} type="number" label="Alpha :" />
						</div> 
					}
					<button
				    	type='submit'
				        className='button'>
				        Search
			    	</button>
			    </form>
			</div>
		)
	}
}

const validate = values => {
	let { search, alpha } = values
	alpha = +alpha
	const errors = {}
	if (!search || search.trim() == '') {
    	errors.search = 'Required'
	}

	if(!(alpha >= 0 && alpha <= 1)){
		errors.alpha = 'The value must be in range 0 to 1'
	}

	return errors
}

Home = reduxForm({
	form: 'home',
	validate
})(Home)

const selector = formValueSelector('home')

const mapStateToProps = (state) => ({
	initialValues: {
		filter: 'rerank',
		alpha: 0.5
	},
	searchText: selector(state, 'search'),
	filter: selector(state, 'filter'),
	alpha: selector(state, 'alpha'),
	data: state.search.get.data
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit(values) {
    dispatch(getSearch(values))
  }
})

Home = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)

export default Home