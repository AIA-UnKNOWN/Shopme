import './App.css';
import { Component } from "react";

import CategoryLoadingAnim from './Animations/CategoryLoadingAnim';
import ProductLoadingAnim from './Animations/ProductLoadingAnim';
import Category from './Components/Category/Category';
import SearchField from './Components/Products/SearchField';
import Products from './Components/Products/Products';
import Product from './Components/Products/Product';



class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			categoriesLoading: true,
			productsLoading: true,
			categories: [ /* categories */ ],
			products: [ /* products */ ],
			searchItem: ''
		};
		this.searchProduct = this.searchProduct.bind(this);
	}

	componentDidMount() {
		// Fetching data for products
		fetch('https://fakestoreapi.com/products')
		.then(resp => resp.json())
		.then(json => this.setState({
			products: json,
			productsLoading: false
		}));

		// Fetching data for categories
		fetch('https://fakestoreapi.com/products/categories')
		.then(resp => resp.json())
		.then(json => this.setState({
			categories: json,
			categoriesLoading: false
		}));
	}

	componentWillUnmount() {
		this.setState({
			categoriesLoading: true,
			productsLoading: true,
			categories: [],
			products: [],
			searchItem: ''
		});
	}

	searchProduct(e) {
		const value = e.target.value;

		this.setState({
			searchItem: value
		});
	}

	render() {
		const { categoriesLoading, productsLoading, categories, products, searchItem } = this.state;

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
						{categoriesLoading || !categories ? <CategoryLoadingAnim /> :
						categories.map(category =>
							<Category
								key={category.toUpperCase()}
								value={category}
							/>)
						}
						</ul>
					</div>
					<div className="products">
						<SearchField
							product={searchItem}
							searchHandler={this.searchProduct}
						/>
						<Products itemsFound={products.length}>
						{productsLoading || !products ?
							<ProductLoadingAnim /> :
							// Each product matches
							products.map(product =>
								<Product
									viewProduct={null}
									productImg={product.image}
									productTitle={product.title}
									productPrice={product.price}
									addToCart={null}
								/>
							)
						}		
						</Products>
					</div>

				</div>

			</div>
		);
	}

}

export default App;
