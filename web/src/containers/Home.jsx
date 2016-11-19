import React, { Component } from 'react'
import { Link } from 'react-router'
import { 
	LogoImg,
	CatImg,
	DogImg
} from 'assets/images'

let x

export default class Home extends Component {

	constructor(props){
		super(props)
		this.state = {
			counter: 0
		}
	}

	_updateCounter(){
		this.setState({ counter: this.state.counter + 1})
	}

	componentWillMount(){
		console.log(process.env)
		console.log(`${__VERSION__},aaaa`)
	}

	componentDidMount(){
		x = setInterval(() => this._updateCounter(), 500)
	}

	componentWillUnmount(){
		clearInterval(x)
	}

	render(){
		return(
			<div>
				<h1>Home</h1>
				<h1>{ this.state.counter }</h1>
				<button onClick={() => this._updateCounter()}>Click</button>
				<Link to={'/result/999'}><h2>next</h2></Link>
				<img src={LogoImg} />
				<img src={CatImg} />
				<img src={DogImg} />
			</div>
		)
	}
}