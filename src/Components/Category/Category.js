import './Category.css';

function Category(props) {
	return (
		<li>
			<button>{props.value}</button>
		</li>
	);
}

export default Category;