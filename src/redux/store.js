import { configureStore } from "@reduxjs/toolkit"
import inventeoyReducer from "./inventerySlice"
const store = configureStore({
	reducer: {
		inventory: inventeoyReducer
	}
})
export default store