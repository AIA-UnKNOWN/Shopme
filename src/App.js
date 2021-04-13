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
			searchItem: '',
			newProducts: []
		};
		this.searchProduct = this.searchProduct.bind(this);
	}

	componentDidMount() {
		// Fetching data for products
		fetch('https://fakestoreapi.com/products')
		.then(resp => resp.json())
		.then(json => this.setState({
			products: json,
			newProducts: json,
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
			searchItem: '',
			newProducts: []
		});
	}

	searchProduct(e) {
		const searchItem = e.target.value;
		const products = this.state.products;
		const productsLoading = this.state.productsLoading;

		let newProductsRes = products.filter(product => product.title.toLowerCase().includes(searchItem)) || products.description.toLowerCase().includes(searchItem);

		this.setState({
			productsLoading,
			searchItem,
			newProducts: newProductsRes
		});

		console.log(searchItem);
		console.log(products);
		console.log(this.state.newProducts);
	}

	render() {
		const { categoriesLoading, productsLoading, categories, products, searchItem, newProducts } = this.state;

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
						<Products itemsFound={newProducts.length}>
						{productsLoading ?
							<ProductLoadingAnim /> :
							newProducts.map(product =>
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
