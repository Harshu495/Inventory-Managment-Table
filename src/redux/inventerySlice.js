import { createSlice } from "@reduxjs/toolkit";
import sampleData from "../data.json"

const inventorySlice = createSlice({
	name: "inventory",
	initialState: { data: sampleData, filterCategory: "", sortBy: "", editId: null },
	reducers: {
		addData: (state, action) => {
			const newId = state.data.length > 0 ? Math.max(...state.data.map(item => item.id)) + 1 : 1
			const newItem = { ...action.payload, id: newId }
			state.data.push(newItem)
		},
		removeData: (state, action) => {
			const index = state.data.findIndex((item) => item.id === action.payload)
			console.log(index)
			state.data.splice(index, 1)
		},
		addEditId: (state, action) => {
			state.editId = action.payload
		},
		updateData: (state, action) => {
			const index = state.data.findIndex(item => item.id === action.payload.id)
			state.data[index] = action.payload
			state.editId = null
		},
		setFilterCategory: (state, action) => {
			state.filterCategory = action.payload;  // Update filter category
		},
		setSortBy: (state, action) => {
			state.sortBy = action.payload;  // Update sorting criteria
		}
	}
})
export const { addData, removeData, addEditId, updateData, setFilterCategory, setSortBy } = inventorySlice.actions
export default inventorySlice.reducer