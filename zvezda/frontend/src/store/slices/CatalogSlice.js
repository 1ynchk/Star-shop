import { createSlice } from '@reduxjs/toolkit';
import { fetchGetCategories } from './../queries/Catalog/getCategories';

const CatalogSlice = createSlice(
    {
        name: 'catalog',

        initialState: {
            categories: []
        },

        extraReducers: (builder) => {
            builder
                .addCase(
                    fetchGetCategories.fulfilled, (state, action) => {
                        state.categories = [... action.payload.data]
                    }
                )
        }
    }
)

export default CatalogSlice.reducer