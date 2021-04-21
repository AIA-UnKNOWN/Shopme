import Products from './Products';
import './ProductView.css';


function ProductView(props) {
	const product = props.product;
	return (
		<div className="product-wrapper">
			<span className="X" onClick={props.onExit}>
				<i class="fas fa-times"></i>
			</span>

			<div className="view-product">
				<div className="image-container">
					<img src={product.image} alt={product.title} />
				</div>
				<div className="item-infos">
					<p className="title">{product.title}</p>
					<p className="description">{product.description}</p>
					<div className="price-buynow">
						<span>${product.price}</span>
						<button onClick={props.onBuy} name={product.title}>Buy Now</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductView;