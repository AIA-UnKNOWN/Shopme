import './CartItem.css';


function CartItem(props) {
	return (
		<div className="cart-item">
			<input type="checkbox" name={props.object} id={props.object} className="toggle-add-to-cart" />
			<div className="item">

				<div className="img-wrapper">
					<img src={props.img} alt={props.img} />
				</div>

				<div className="item-info">
					<p className="item-title">{props.title}</p>
					<p className="item-price">{props.price}</p>
					<div className="quantity-adjuster">
						<button className="quantity-increment">+</button>
						<span className="item-quantity">1</span>
						<button className="quantity-decrement">-</button>
					</div>
				</div>

			</div>
		</div>
	);
}

export default CartItem;