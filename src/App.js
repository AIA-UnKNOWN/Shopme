import './App.css';
import { Component } from "react";

import Category from './Components/Category/Category';
import CategoryLoadingAnim from './Animations/CategoryLoadingAnim';



class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			categories: [ /* categories */ ],
			products: { /* products */ },
		};
	}

	componentDidMount() {
		// Fetching data for products
		fetch('https://fakestoreapi.com/products')
		.then(resp => resp.json())
		.then(json => this.setState({
			products: json,
			loading: false
		}));

		// Fetching data for categories
		fetch('https://fakestoreapi.com/products/categories')
		.then(resp => resp.json())
		.then(json => this.setState({
			categories: json,
			loading: false
		}));
	}

	componentWillUnmount() {
		this.setState({
			loading: true,
			categories: [],
			products: {}
		});
	}

	render() {
		const { loading, categories, products } = this.state;

		return (
			<div className="App">
				
				<header>
					<label className="logo">ShopME</label>
					<ul>
						<li><a href="">Home</a></li>
						<li><a href="">Cart</a></li>
						<li><a href="">Login</a></li>
					</ul>
					<i className="fas fa-bars"></i>
				</header>
				<div className="content">

					<div className="categories">
						<p>Categories</p>
						<ul>
						{loading || !categories ? <CategoryLoadingAnim /> :
						categories.map(category =>
							<Category
								key={category.toUpperCase()}
								value={category}
							/>)
						}
						</ul>
					</div>

				</div>

			</div>
		);
	}

}

export default App;
