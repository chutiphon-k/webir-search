import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import Slider from 'react-rangeslider'
import actions from 'actions'
import styles from 'containers/Home.css'
import 'containers/react-rangeslider.less'
import { imgPony1 } from 'assets/images'

const { getSearch } = actions

class Home extends Component {

    state = {
      value: 10
    }

	handleChange = (value) => {
		this.setState({
			value: +value.toFixed(1)
		});
	}

	render(){
		const { fields, handleSubmit } = this.props
	    let { value } = this.state;
		return (
			<div>
				<h1>Miracle of Pony Search</h1>
				<img src={imgPony1} className={styles.logo} />
			    <form onSubmit={handleSubmit} className='form' action='javascript:void(0)'>
			        <div>
						<Field name="search" component="input" type="text" />
						{' '}
						<br />
						<button
					    	type='submit'
					        className='button'>
					        Search
				    	</button>
			        </div>
			    </form>
			    <div>
					<Slider
						min={0}
						max={100}
						value={value}
						step={0.1}
						orientation='horizontal'
						onChange={this.handleChange}
					/>
					<div>Similarity | Popularity</div>
					<div className='value'>Value: {value}</div>
			    </div>
			</div>
		)
	}
}

const validate = values => {
	const errors = {}
	if (!values.search || values.search.trim() == '') {
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

const mapDispatchToProps = (dispatch) => ({
  onSubmit(values) {
  	console.log(values)
    // dispatch(getSearch(values))
  }
})

// const mapDispatchToProps = {
// 	onSubmit: getSearch
// }

Home = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)

export default Home