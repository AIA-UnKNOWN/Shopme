import './CartItem.css';


function CartItem(props) {
	return (
		<div className="cart-item">
			<input type="checkbox" name={props.object.title} id={props.object.title} onChange={props.onSelect}
				className="toggle-add-to-cart"
				checked={props.isSelected}
			/>
			
			<div className="item">

				<div className="img-wrapper">
					<img src={props.img} alt={props.img} />
				</div>

				<div className="item-info">
					<p className="item-title">{props.title}</p>
					<p className="item-price">${props.price}</p>
					<div className="quantity-adjuster">
						<button onClick={props.decrementQuantity} name={props.object.title} className="quantity-decrement">-</button>
						<span className="item-quantity">{(props.quantity ? props.quantity : 1)}</span>
						<button onClick={props.incrementQuantity} name={props.object.title} className="quantity-increment">+</button>
					</div>
				</div>

			</div>

		</div>
	);
}

export default CartItem;