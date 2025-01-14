import { configureStore, combineReducers } from "@reduxjs/toolkit";

import productReducer from "./slices/ProductSlice.js";
import exactProductReducer from './slices/ExactProductSlice.js'
import popupReducer from './slices/PopupSlice.js'
import usersReducer from './slices/UsersSlice.js'
import profileReducer from './slices/ProfileSlice.js'
import notificationReducer from './slices/Notification.js'
import SliceReducer from './slices/CatalogSlice.js'

const reducers = combineReducers(
    {
        products: productReducer,
        exactProduct: exactProductReducer,
        popup: popupReducer,
        users: usersReducer,
        profile: profileReducer,
        notification: notificationReducer,
        catalog: SliceReducer
    }
)

const store = configureStore(
    {
        reducer: reducers
    }
)

export default store;