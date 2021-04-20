import './App.css';
import { Component } from "react";

import CategoryLoadingAnim from './Animations/CategoryLoadingAnim';
import ProductLoadingAnim from './Animations/ProductLoadingAnim';
import Category from './Components/Category/Category';
import SearchField from './Components/Products/SearchField';
import Products from './Components/Products/Products';
import Product from './Components/Products/Product';
import CartItem from './Components/Cart/CartItem';



class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			categoriesLoading: true,
			productsLoading: true,
			categories: [ /* categories */ ],
			products: [ /* products */ ],
			searchItem: '',
			newProducts: [],
			cart: []
		};
		this.searchProduct = this.searchProduct.bind(this);
		this.addToCartHandler = this.addToCartHandler.bind(this);
		// Navs
		this.electronics = this.electronics.bind(this);
		this.jewelery = this.jewelery.bind(this);
		this.menclothing = this.menclothing.bind(this);
		this.womenclothing = this.womenclothing.bind(this);
		// Cart Items
		this.onSelectItem = this.onSelectItem.bind(this);
		this.itemCartDecrementQuantity = this.itemCartDecrementQuantity.bind(this);
		this.itemCartIncrementQuantity = this.itemCartIncrementQuantity.bind(this);
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
			newProducts: [],
			cart: []
		});
	}

	electronics() {
		const products = this.state.products;
		const electronicItems = products.filter(product => product.category === 'electronics');

		this.setState({
			newProducts: electronicItems
		});
	}

	jewelery() {
		const products = this.state.products;
		const jeweleryItems = products.filter(product => product.category === 'jewelery');

		this.setState({
			newProducts: jeweleryItems
		});
	}

	menclothing() {
		const products = this.state.products;
		const menclothingItems = products.filter(product => product.category === 'men clothing');

		this.setState({
			newProducts: menclothingItems
		});
	}

	womenclothing() {
		const products = this.state.products;
		const womenclothingItems = products.filter(product => product.category === 'women clothing');

		this.setState({
			newProducts: womenclothingItems
		});
	}

	searchProduct(e) {
		const searchItem = e.target.value;
		const products = this.state.products;
		const productsLoading = this.state.productsLoading;

		let newProductsRes = products.filter(product => product.title.toLowerCase().includes(searchItem.toLowerCase())) || products.description.toLowerCase().includes(searchItem);

		this.setState({
			productsLoading,
			searchItem,
			newProducts: newProductsRes
		});
	}

	addToCartHandler(e) {
		const name = e.target.name;
		const newProducts = this.state.newProducts;
		
		// Gets item and stores it in an array when it matches the item name
		let itemCart = newProducts.filter(item => item.title === name)

		// Assings it to be a single value
		itemCart = itemCart[0]
		
		// Changes the state for later process
		const cart = [...this.state.cart, itemCart];
		this.setState({
			cart
		});
		
		// Gets the latest state
		const stateCart = this.state.cart;
		// Pushes all the items in this array so that we can modify its values
		// This is where we scan for duplicates items
		const newCart = [...stateCart];
		// This is where we store our item for modifying properties
		let map = {};

		// This checks if the item is already in the dummy cart (newCart)
		if (newCart.includes(itemCart)) {
			// Gets the index of the item in newCart for further access
			const i = newCart.indexOf(itemCart);
			// Checks if the item has a 'quantity' property and increments it
			if (newCart[i].quantity) {
				newCart[i].quantity++;
			}
		} else {
			// If item is not there
			// It is set to map 
			// Assigns the quatity value
			// Then pushes it
			map = itemCart;
			map.quantity = 1;
			// Adds another property for selection
			map.isSelected = false;
			newCart.push(map);
		}

		// Now lets change our data
		this.setState({
			cart: newCart
		});
	}

	onSelectItem(e) {
		const cart = this.state.cart;
		const name = e.target.name;
		const dummyCart = [...cart];

		let item = dummyCart.filter(item => item.title === name);
		item = item[0];

		// Checks if the item has 'isSelected' property
		const i = dummyCart.indexOf(item);

		// Reverses the value everytime the user checks it
		// for ex., if true, it will become false and vice versa
		dummyCart[i]['isSelected'] = !dummyCart[i]['isSelected'];

		this.setState({
			cart: dummyCart
		});


		console.log(this.state.cart)
	}

	itemCartDecrementQuantity(e) {
		const name = e.target.name;
		const cart = this.state.cart;
		const modifiedCart = [...cart];
		let cartItem = modifiedCart.filter(item => item.title === name);
		cartItem = cartItem[0]

		// Gets the index of the item in cart
		const i = modifiedCart.indexOf(cartItem);

		// checks if quantity is greater than one so that it can still decrease until it reaches 1
		if (modifiedCart[i]['quantity'] > 1) {
			// Decreases the quantity
		modifiedCart[i]['quantity']--;
		}

		this.setState({
			cart: modifiedCart
		});
	}

	itemCartIncrementQuantity(e) {
		const name = e.target.name;
		const cart = this.state.cart;
		const modifiedCart = [...cart];
		let cartItem = modifiedCart.filter(item => item.title === name);
		cartItem = cartItem[0]

		// Gets the index of the item in cart
		const i = modifiedCart.indexOf(cartItem);

		// Decreases the quantity
		modifiedCart[i]['quantity']++;
		

		this.setState({
			cart: modifiedCart
		});
	}

	totalItemCartAmount() {
		const cart = this.state.cart;
		const selectedItems = cart.filter(item => item.isSelected);
		const dummyCart = selectedItems.map(item => item.price * item.quantity);
		let totalAmount;

		if (dummyCart == false) {
			totalAmount = 0;
		} else {
			totalAmount = dummyCart.reduce((previous, current) => previous + current);
		}
		
		return totalAmount;
	}

	deleteSelectedCartItem() {

	}

	checkoutSelectedCartItem() {

	}

	render() {
		const { categoriesLoading, productsLoading, categories, searchItem, newProducts, cart } = this.state;

		return (
			<div className="App">
				
				<header>
					<label className="logo">ShopME</label>
					<ul>
						<li><button onClick={null}>Home</button></li>
						<li><button onClick={null}>Cart</button></li>
						<li><button onClick={null}>Login</button></li>
					</ul>
					<i className="fas fa-bars"></i>
				</header>
				<div className="content">

					<div className="categories">
						<input type="checkbox" name="toggleCategories" id="toggleCategories" />
						<label htmlFor="toggleCategories">Categories</label>
						<ul>
						{categoriesLoading || !categories ? <CategoryLoadingAnim /> : 
						categories.map(category => {
							let destination;

							if (category === 'electronics') {
								destination = this.electronics;
							} else if (category === 'jewelery') {
								destination = this.jewelery;
							} else if (category === 'men clothing') {
								destination = this.menclothing;
							} else if (category === 'women clothing') {
								destination = this.womenclothing;
							}
							
							return (
								<Category
									key={category}
									value={category}
									nav={destination}
								/>
							)
						})}
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
									key={product.title.toUpperCase()}
									viewProduct={null}
									productImg={product.image}
									productTitle={product.title}
									productPrice={product.price}
									addToCart={this.addToCartHandler}
								/>
							)
						}
						</Products>
					</div>
					<div className="cart">
						<input type="checkbox" name="toggleCart" id="toggleCart" />
						<label htmlFor="toggleCart">Cart</label>
						<div className="cart-items-container">
							<div className="cart-items">
							{cart.map(item =>
								<CartItem
									key={item.title}
									isSelected={item.isSelected}
									onSelect={this.onSelectItem}
									object={item}
									img={item.image}
									title={item.title}
									price={item.price}
									quantity={item.quantity}
									decrementQuantity={this.itemCartDecrementQuantity}
									incrementQuantity={this.itemCartIncrementQuantity}
								/>)
							}
							</div>
							<div className="process-cart-items">
								<div className="calculations">
									<span className="total-label">Total:</span>
									<span className="total-amount">${this.totalItemCartAmount()}</span>
								</div>
								<button onClick={null} className="remove-items">
									<i class="fas fa-trash-alt"></i>
								</button>
								<button onClick={null} className="buy-items">
									<i class="fas fa-shopping-cart"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
		
			</div>
		);
	}

}

export default App;
