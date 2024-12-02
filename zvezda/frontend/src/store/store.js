import { configureStore, combineReducers } from "@reduxjs/toolkit";

import productReducer from "./slices/ProductSlice.js";
import exactProductReducer from './slices/ExactProductSlice.js'
import popupReducer from './slices/PopupSlice.js'
import usersReducer from './slices/UsersSlice.js'

const reducers = combineReducers(
    {
        products: productReducer,
        exactProduct: exactProductReducer,
        popup: popupReducer,
        users: usersReducer
    }
)

const store = configureStore(
    {
        reducer: reducers
    }
)

export default store;