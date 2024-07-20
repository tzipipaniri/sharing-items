import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    categories: [],
    status: 'idle',
    selectedCategory: {}
}

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (thunkApi) => {
        console.log('in fetch categories');
        let token = localStorage.getItem('token')
        console.log('token', token);
        try {
            const response = await axios.get(`https://localhost:7106/api/Category`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log('response.data', response.data);
            if (response.status === 200)
                return response.data;
            // else return thunkApi.rejectWithValue('not categories')
        }
        catch (error) {
            console.log(error.message);
            // return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const fetchCategoryById = createAsyncThunk(
    'categories/fetchCategoryById',
    async (id) => {
        console.log('in fetchCoursesById');
        const response = await axios.get(`https://localhost:7106/api/Category/${id}`)
        console.log('category by id', response.data);
        return response.data
    }
)

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategories',
    async (id, thunkApi) => {
        console.log('in delete category');
        const response = await axios.delete(`https://localhost:7106/api/Category/${id}`)
        console.log(response);
        return response.data
    }
)

// export const postCategory=createAsyncThunk(
//     'categories/postCategories',
//     async(c,thunkApi)=>{
//         console.log('in delete category');
//         const response=await axios.post('https://localhost:7106/api/Category',c)
//         console.log(response);
//         return response.data
//     }
// )

// export const putCategory=createAsyncThunk(
//     'categories/putCategories',
//     async(id,thunkApi)=>{
//         console.log('in delete category');
//         const response=await axios.delete('https://localhost:7106/api/Category/'+id)
//         console.log(response);
//         return response.data
//     }
// )

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.categories = action.payload
        })
        builder.addCase(fetchCategoryById.fulfilled, (state, action) => {
            state.selectedCategory = action.payload
        })
        builder.addCase(deleteCategory.pending, (state, action) => {
            state.action = 'pending'
        })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.action = 'fulfilled'
                console.log('action.payload', action.payload);
                state.categories = state.categories.filter(c => c.id !== action.payload.id)
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.status = 'rejected'
                console.log(action);
            })
    }
})

export const { } = categorySlice.actions
export default categorySlice.reducer

// חפצים חדשים 
//rfce tab
//react לכתוב
//ללכת לשני ES7