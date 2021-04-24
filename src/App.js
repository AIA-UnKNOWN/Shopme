import './App.css';
import { Component } from "react";
import { render } from "react-dom";

import CategoryLoadingAnim from './Animations/CategoryLoadingAnim';
import ProductLoadingAnim from './Animations/ProductLoadingAnim';
import Category from './Components/Category/Category';
import SearchField from './Components/Products/SearchField';
import Products from './Components/Products/Products';
import Product from './Components/Products/Product';
import CartItem from './Components/Cart/CartItem';
import Notification from './Components/Notification/Notification';
import ProductView from './Components/Products/ProductView';



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
			cart: [],
			notification: ''
		};
		this.searchProduct = this.searchProduct.bind(this);
		this.addToCartHandler = this.addToCartHandler.bind(this);
		this.viewProduct = this.viewProduct.bind(this);
		this.exitViewProduct = this.exitViewProduct.bind(this);
		this.buyItem = this.buyItem.bind(this);
		// Navs
		this.allProducts = this.allProducts.bind(this);
		this.electronics = this.electronics.bind(this);
		this.jewelery = this.jewelery.bind(this);
		this.menclothing = this.menclothing.bind(this);
		this.womenclothing = this.womenclothing.bind(this);
		// Cart Items
		this.selectAllItemCart = this.selectAllItemCart.bind(this);
		this.onSelectItem = this.onSelectItem.bind(this);
		this.itemCartDecrementQuantity = this.itemCartDecrementQuantity.bind(this);
		this.itemCartIncrementQuantity = this.itemCartIncrementQuantity.bind(this);
		this.deleteSelectedCartItem = this.deleteSelectedCartItem.bind(this);
		this.checkoutSelectedCartItem = this.checkoutSelectedCartItem.bind(this);
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
			cart: [],
			notification: ''
		});
	}

	allProducts() {
		this.setState({
			newProducts: this.state.products
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
		const menclothingItems = products.filter(product => product.category === "men's clothing");

		this.setState({
			newProducts: menclothingItems
		});
	}

	womenclothing() {
		const products = this.state.products;
		const womenclothingItems = products.filter(product => product.category === "women's clothing");

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

	selectAllItemCart(e) {
		const cart = this.state.cart;
		const checked = e.target.checked;

		let allSelected;

		// Checks if the select all is checked
		if (checked) {
			// If checked, all the items are selected
			allSelected = cart.map(item => {
				item.isSelected = true;
				return item;
			});
		} else {
			// IF not, all the items are unselected
			allSelected = cart.map(item => {
				item.isSelected = false;
				return item;
			});
		}

		this.setState({
			cart: allSelected
		});
	}

	allItemSelected() {
		const cart = this.state.cart;
		const selectedItems = cart.filter(item => item.isSelected);
		let items = selectedItems.length;

		return items;
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
		
		return totalAmount.toFixed(2);
	}

	deleteSelectedCartItem() {
		const cart = this.state.cart;
		const itemsLeft = cart.filter(item => !item.isSelected);
		const selectedItems = cart.filter(item => item.isSelected);

		if (!selectedItems.length) {
			// Delete selected items and replace cart with the unselected ones
			this.setState({
				notification: `No selected item/s.`
			});
		} else {
			// Delete selected items and replace cart with the unselected ones
			this.setState({
				cart: itemsLeft,
				notification: `${selectedItems.length} item/s deleted.`
			});
		}
		

		// Styling notification UI for pop up
		const notification = document.querySelector('#notification');
		notification.style.top = '10px';
		notification.style.background = '#fcdddd';
		notification.style.color = '#ce0606';

		// Counts down then pop up will disappear
		let timerID = setTimeout(function() {
			notification.style.top = '-100%';
			clearTimeout(timerID);
		}, 3000);
	}

	checkoutSelectedCartItem() {
		const cart = this.state.cart;
		const selectedItems = cart.filter(item => item.isSelected);
		
		if (!selectedItems.length) {
			this.setState({
				notification: `No item/s selected.`
			});
		} else {
			this.setState({
				notification: `You successfully bought ${selectedItems.length} item/s.`
			});
		}

		// Styling notification UI for pop up
		const notification = document.querySelector('#notification');
		notification.style.top = '10px';
		notification.style.background = '#aaf7a6';
		notification.style.color = '#033d00';

		// Counts down then pop up will disappear
		let timerID = setTimeout(function() {
			notification.style.top = '-100%';
			clearTimeout(timerID);
		}, 3000);
	}

	exitViewProduct() {
		const container = document.querySelector('#view-product');
		container.style.display = 'none';
	}

	buyItem(e) {
		const name = e.target.name;

		this.setState({
			notification: `You successfully bought "${name}"`
		});

		// Styling notification UI for pop up
		const notification = document.querySelector('#notification');
		notification.style.top = '10px';
		notification.style.background = '#aaf7a6';
		notification.style.color = '#033d00';

		// Counts down then pop up will disappear
		let timerID = setTimeout(function() {
			notification.style.top = '-100%';
			clearTimeout(timerID);
		}, 3000);
	}

	viewProduct(e) {
		const products = this.state.newProducts;
		const id = e.target.id;
		let item = products.filter(item => item.title === id);
		item = item[0];

		// Gets the container
		const container = document.querySelector('#view-product');
		container.style.display = 'block';
		render(
			<ProductView product={item} onExit={this.exitViewProduct} onBuy={this.buyItem} />,
			container
		);
	}

	render() {
		const { categoriesLoading, productsLoading, categories, searchItem, newProducts, cart, notification } = this.state;

		return (
			<div className="App" id="App">
				
				<Notification text={notification} />
				<div id="view-product"></div>
				<header>
					<label className="logo">ShopME</label>
					<ul>
						<li><button onClick={null}>Credits</button></li>
					</ul>
					<i className="fas fa-bars"></i>
				</header>
				<div className="content">

					<div className="categories">
						<input type="checkbox" name="toggleCategories" id="toggleCategories" />
						<label htmlFor="toggleCategories">Categories</label>
						<ul>
							<Category
								key="allproducts"
								value="ALL"
								nav={this.allProducts}
							/>
						{categoriesLoading || !categories ? <CategoryLoadingAnim /> : 
						categories.map(category => {
							let destination;

							if (category === 'electronics') {
								destination = this.electronics;
							} else if (category === 'jewelery') {
								destination = this.jewelery;
							} else if (category === "men's clothing") {
								destination = this.menclothing;
							} else if (category === "women's clothing") {
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
									viewProduct={this.viewProduct}
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
							<div className="select-all">
								<input type="checkbox" name="select-all-item" id="select-all-item" onChange={this.selectAllItemCart} />
								<label htmlFor="select-all-item">Select All</label>
								<span className="items-selected">({this.allItemSelected()})</span>
							</div>
							<div className="process-cart-items">
								<div className="calculations">
									<span className="total-label">Total:</span>
									<span className="total-amount">${this.totalItemCartAmount()}</span>
								</div>
								<button onClick={this.deleteSelectedCartItem} className="remove-items">
									<i class="fas fa-trash-alt"></i>
								</button>
								<button onClick={this.checkoutSelectedCartItem} className="buy-items">
									<i class="fas fa-shopping-cart"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
				<a className="go-to-top" href="#App">
					<i class="fas fa-chevron-up"></i>
				</a>
		
			</div>
		);
	}

}

export default App;
