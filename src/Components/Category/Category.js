import './Category.css';

function Category(props) {
	const value = props.value;
	const nav = props.nav;

	return (
		<li>
			<button onClick={nav} className="category">{value}</button>
		</li>
	);
}

export default Category;