import './Products.css';

function Products(props) {
	return (
		<div className="results">
			<p className="result-indicator">{props.itemsFound} Items Found</p>
			<div className="items">
				{props.children}
			</div>
		</div>
	);
}

export default Products;