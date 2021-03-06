import './Product.css';

function Product(props) {
	return (
		<div className="product">
			<div className="img-wrapper">
				<img src={props.productImg} alt={props.productTitle} />
			</div>
			<div className="product-info">
				<p className="title" onClick={props.viewProduct} id={props.productTitle}>{props.productTitle}</p>
				<div className="price-quantity">
					<span className="price">${props.productPrice}</span>
					<span className="quantity-wrapper">
						<button className="subt-quantity">-</button>
						<span className="quantity">1</span>
						<button className="add-quantity">+</button>
					</span>
				</div>
				<button className="add-to-cart" onClick={props.addToCart} name={props.productTitle}>Add to cart</button>
			</div>
		</div>
	);
}

export default Product;