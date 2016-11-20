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
				<h1>ม้าโพนี่มหัสจรรย์<img src={imgPony1} className={styles.imgLogo} /></h1>
			    <form onSubmit={handleSubmit} className='form' action='javascript:void(0)'>
			        <div>
			          <label>First Name</label>
			          <Field name="firstName" component="input" type="text" />
			        </div>
					<button
				        type='submit'
				        className='button'>
			        Submit
			      </button>
			    </form>
				<Link to={`/result/100`}><h2>Result</h2></Link>
			</div>
		)
	}
}

Home = reduxForm({
    form: 'home',
    initialValues: {firstName: 'eiei'},
})(Home)

const selector = formValueSelector('home')

const mapStateToProps = (state) => ({
	search: state.search
})

const mapDispatchToProps = {
	onSubmit: getSearch
}

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default Home