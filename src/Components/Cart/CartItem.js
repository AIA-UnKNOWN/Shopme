import './CartItem.css';


function CartItems(props) {
	return (
		<div className="cart-item">
			<input type="checkbox" name="" id="" />
			<div className="item">
				<div className="img-wrapper">
					<img src="" alt="" />
				</div>
				<div className="item-info">
					<p className="item-description"></p>
					<div className="quantity-adjuster">
						<button className="quantity-increment"></button>
						<span className="item-quantity"></span>
						<button className="quantity-decrement"></button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartItems;