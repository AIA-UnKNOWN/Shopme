import './Products.css';

function pluralize(count, word, suffix='s') {
	return (
		count === 0 ? `No ${word}` :
		count === 1 ? word :
			`${word + suffix}`
	);
}

function Products(props) {
	return (
		<div className="results">
			<p className="result-indicator">{`${props.itemsFound ? props.itemsFound : ''} ${pluralize(props.itemsFound, 'Item')}`} Found</p>
			<div className="items">
				{props.children}
			</div>
		</div>
	);
}

export default Products;