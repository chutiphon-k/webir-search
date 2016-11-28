import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import actions from 'actions'
import styles from 'containers/Home.css'
import { imgPony1 } from 'assets/images'

const { getSearch } = actions

const renderField = ({ input, label, type, step, min, max, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>{' '}
	<input {...input} type={type} step={step} min={min} max={max} />
	<br />
	{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)

class Home extends Component {

    state = {}

	render(){
		const { handleSubmit } = this.props
		return (
			<div>
				<img src={imgPony1} className={styles.logo} />
			    <form onSubmit={handleSubmit} className='form' action='javascript:void(0)'>
					<Field className="field" name="search" component="input" type="text" autoFocus />
					<Field className="field" name="filter" component="select">
						<option value="similarity">Similarity</option>
						<option value="pagerank">PageRank</option>
						<option value="rerank">Rerank</option>
					</Field>
					<br />
					{ 
						(this.props.filter == 'rerank') && 
						<div>
							<Field name="alpha" component={renderField} type="number" label="Alpha :" step="0.1" min="0" max="1" />
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
		filter: 'similarity',
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