import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData, updateData } from "../redux/inventerySlice";
import '@fortawesome/fontawesome-free/css/all.min.css';


const initialData = {
	name: "",
	category: "",
	quantity: 0,
	price: 0,
	description: "",
};

export default function InventoryForm() {
	const [formData, setFormData] = useState(initialData);
	const { data, editId } = useSelector((state) => state.inventory);
	const dispatch = useDispatch();
	const [addButton, setAddButton] = useState(false);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (editId) {
			const inventoryData = data.find((item) => item.id === editId);
			setAddButton(true);
			setFormData({
				name: inventoryData.name,
				category: inventoryData.category,
				quantity: inventoryData.quantity,
				price: inventoryData.price,
				description: inventoryData.description,
			});
		}
	}, [editId]);

	// Validate form inputs
	const validateForm = () => {
		let newErrors = {};

		if (!formData.name.trim()) newErrors.name = "Name is required.";
		if (!formData.category.trim()) newErrors.category = "Category is required.";
		if (!formData.description.trim()) newErrors.description = "Description is required.";

		if (!formData.quantity) {
			newErrors.quantity = "Quantity is required.";
		} else if (isNaN(formData.quantity) || Number(formData.quantity) <= 0) {
			newErrors.quantity = "Quantity must be a positive number.";
		}

		if (!formData.price) {
			newErrors.price = "Price is required.";
		} else if (isNaN(formData.price) || Number(formData.price) <= 0) {
			newErrors.price = "Price must be a positive number.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0; // Returns true if no errors
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			if (editId) {
				dispatch(updateData({ ...formData, id: editId }));
				setFormData(initialData);
				setAddButton(false);
			} else {
				dispatch(addData(formData));
				setFormData(initialData);
				setAddButton(false);
			}
		}
	};

	return (
		<div>
			<button onClick={() => setAddButton(true)} disabled={addButton} className="add-item-btn">
				<i className="fa fa-plus"></i> Add Item
			</button>

			{addButton && (
				<div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setAddButton(false)}>

					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<h2>{editId ? "Edit Item" : "Add New Item"}</h2>
						<form onSubmit={handleSubmit}>
							<label>Name</label>
							<input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
							{errors.name && <span className="error">{errors.name}</span>}
							<br />

							<label>Category</label>
							<input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
							{errors.category && <span className="error">{errors.category}</span>}
							<br />

							<label>Quantity</label>
							<input type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} />
							{errors.quantity && <span className="error">{errors.quantity}</span>}
							<br />

							<label>Price</label>
							<input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
							{errors.price && <span className="error">{errors.price}</span>}
							<br />

							<label>Description</label>
							<input type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
							{errors.description && <span className="error">{errors.description}</span>}
							<br />

							<div className="modal-actions">
								<button type="submit" className="submit-btn">
									{editId ? "Update Item" : "Add Item"}
								</button>
								<button type="button" className="cancel-btn" onClick={() => {
									setAddButton(false)
									setErrors({});
									setFormData(initialData)
								}}>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
