import './Category.css';

function Category(props) {
	return (
		<li>
			<button className="category">{props.value}</button>
		</li>
	);
}

export default Category;