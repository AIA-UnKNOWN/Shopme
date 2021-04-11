import './SearchField.css';

function SearchField(props) {
	return (
		<div className="search-area">
			<div>
				<input
					type="text"
					name="search-product"
					id="search-product"
					placeHolder="Search item"
					value={props.product}
					onChange={props.searchHandler}
				/>
				<i class="fas fa-search"></i>
			</div>
		</div>
	);
}

export default SearchField;