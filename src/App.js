import './App.css';
import { Component } from "react";



class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			products: {
				// api here ...
			},
		};
	}

	componentDidMount() {
		fetch('https://fakestoreapi.com/products')
			.then(resp => resp.json())
			.then(json => this.setState({
				products: json
			}));
	}

	componentWillUnmount() {
		this.setState({
			products: {}
		});
	}

	render() {
		return (
			<div className="App">
				
				<header>
					<label class="logo">ShopME</label>
					<ul>
						<li><a href="">Home</a></li>
						<li><a href="">Cart</a></li>
						<li><a href="">Login</a></li>
					</ul>
					<i class="fas fa-bars"></i>
				</header>

			</div>
		);
	}

}

export default App;
