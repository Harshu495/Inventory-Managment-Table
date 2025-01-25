// import "../style.css"

import { useSelector, useDispatch } from "react-redux"
import { removeData, addEditId, setFilterCategory, setSortBy } from "../redux/inventerySlice"

export default function InventoryTable() {
	const { data, filterCategory, sortBy } = useSelector((state) => state.inventory)
	const dispatch = useDispatch()

	// Get unique categories from the data for filter dropdown
	const categories = [...new Set(data.map((item) => item.category))]
	console.log(categories)

	// Filter data based on category
	let displayData = filterCategory ? data.filter(item => item.category === filterCategory) : data;
	console.log(displayData)
	// Sort data by selected criteria
	displayData = [...displayData].sort((a, b) => {
		if (sortBy === "name") {
			return a.name.localeCompare(b.name)
		} else if (sortBy === "quantity") {
			return a.quantity - b.quantity
		}
		return 0
	})
	const handleRemove = (id) => {
		const userConform = window.confirm("Are you sure?")
		if (userConform) {
			dispatch(removeData(id))
		}
	}

	return (<div>
		<select value={filterCategory} onChange={e => dispatch(setFilterCategory(e.target.value))} className="filter-Conatiner">
			<option value=""><i className="fa fa-filter"></i>Filter</option>
			{categories.map((cat, index) => {
				return <option key={index} value={cat}>{cat}</option>
			})}
		</select>


		<select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))} className="sort-container">

			<option value="">Sortby</option>
			<option value="name">Name (A-Z)</option>
			<option value="quantity">quantity (Low to High)</option>
		</select>


		{displayData.length !== 0 &&
			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Category</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Description</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{displayData.length > 0 ? (displayData.map((item) => {
						return <tr key={item.id}>
							<td>{item.id}</td>
							<td>{item.name}</td>
							<td>{item.category}</td>
							<td> {item.quantity}{" "}
								{item.quantity < 10 && <span className="low">Low</span>}</td>
							<td>{item.price}</td>
							<td>{item.description}</td>
							<td>
								<button
									onClick={() => {
										dispatch(addEditId(item.id))
									}}
									className="edit-btn"
								>Edit</button>
								<button onClick={() => {
									handleRemove(item.id)
								}} className="remove-btn">Remove</button></td>
						</tr>
					})) : <tr>
						<td colSpan="7" style={{ textAlign: "center" }}>No items found</td>
					</tr>}

				</tbody>
			</table>
		}
	</div>)
}