import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    responses: [],
    status: 'idle',
}

const apiUrl = 'https://localhost:7106/api'

export const fetchResponses = createAsyncThunk(
    'responses/fetchResponses',
    async (thunkApi) => {
        console.log('in fetch responses');
        try {
            const response = await axios.get(`https://localhost:7106/api/Response`)
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

export const fetchResponseById = createAsyncThunk(
    'responses/fetchResponseById',
    async (id) => {
        console.log('in fetchResponseById');
        const response = await axios.get(`https://localhost:7106/api/Response/${id}`)
        console.log('response by id', response.data);
        return response.data
    }
)

export const deleteResponse = createAsyncThunk(
    'responses/deleteResponses',
    async (id, thunkApi) => {
        console.log('in delete response');
        try {
            const response = await axios.delete(`https://localhost:7106/api/Response/${id}`)
            console.log(response);
            // return response.data
            return id
        } catch (error) {
            console.log(error.message);
        }

    }
)

export const postResponse = createAsyncThunk(
    'responses/postResponse',
    async (r, thunkApi) => {
        try {
            r.userId=+sessionStorage.getItem('userId')
            console.log('in post response');
            console.log(r)
            const response = await axios.post('https://localhost:7106/api/Response', r)
            response.data.user=await axios.get(`https://localhost:7106/api/User/${+sessionStorage.getItem('userId')}`)
            response.data.user=response.data.user.data
            console.log('before image',response.data)
           // response.data.user.image = await axios.get(`https://localhost:7106/api/Response/getImage/${response.data.user.image}`)
            console.log('response.data',response.data);
            return response.data
        } catch (error) {
            console.log(error);
        }

    }
)

export const updateResponse = createAsyncThunk(
    'responses/updateResponse',
    async (member) => {
        try {
            console.log(member);
            member.userId = +sessionStorage.getItem('userId')
            let response = await axios.put(`${apiUrl}/Response/${member.id}`, member);

            if (response.status === 200) {
                console.log('member.id in udate user', member.id);
                let newResponse = await axios.get(`https://localhost:7106/api/Response/${member.id}`)
                console.log('newItem', newResponse.data);
                return newResponse.data
            }
        }
        catch (error) {
            return (error.message);
        }
    });

export const responseSlice = createSlice({
    name: 'response',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchResponses.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.responses = action.payload
        })
        builder.addCase(fetchResponseById.fulfilled, (state, action) => {
            state.selectedResponse = action.payload
        })
        builder.addCase(deleteResponse.pending, (state, action) => {
            state.action = 'pending'
        })
            .addCase(deleteResponse.fulfilled, (state, action) => {
                state.action = 'fulfilled'
                console.log('action.payload', action.payload);
                state.responses = state.responses.filter(c => +c.id !== +action.payload)
            })

            .addCase(deleteResponse.rejected, (state, action) => {
                state.status = 'rejected'
                console.log(action);
            })

        builder.addCase(postResponse.fulfilled, (state, action) => {
            state.action = 'fulfilled'
            console.log('action.payload', action.payload);
            state.responses.push(action.payload)
        })
        builder.addCase(updateResponse.fulfilled, (state, action) => {
            console.log('action.payload in update response', action.payload);
            let x = state.responses.findIndex(x => x.id == action.payload.id)
            console.log('x', x);
            state.responses[x] = { ...action.payload }
        })
    }
})

export const { } = responseSlice.actions
export default responseSlice.reducer