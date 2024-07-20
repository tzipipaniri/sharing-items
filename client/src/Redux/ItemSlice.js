import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { fetchCategoryById } from './CategorySlice';

const initialState = {
    itemsToGive: [],
    itemsToAsk: [],
    status: 'idle',
    itemsGiveOfUser: [],
    statusItemsGiveOfUser: 'idle',
    itemsAskOfUser: [],
    statusItemsAskOfUser: 'idle',
    selectedItem: {},
    statusSelectedItem: 'idle'
}
const apiUrl = 'https://localhost:7106/api'

export const fetchItems = createAsyncThunk(
    'items/fetchItems',
    async (thunkAPI) => {
        console.log('in fetch categories');
        let item;
        try {
            const response = await axios.get(`https://localhost:7106/api/Item`)
            console.log('response.data', response.data);
            console.log("sdfghjkjhgfdsdfghjmjhgfd");
            console.log('response.data', response);

            // if(response.status===200)

            item = response.data;
            // for (let i = 0; i < item.length; i++) {
            //     const picture = await axios.get(`https://localhost:7106/api/Item/getImage/${item[i].image}`);
            //     // console.log(response2.data); 
            //     item[i] = { ...item[i], pic: picture.data };
            // }
            // else return thunkApi.rejectWithValue('not categories')

            return item
        }
        catch (error) {
            console.log('items', error.message);
            // return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const fetchItemById = createAsyncThunk(
    'items/fetchItemById',
    async (id) => {
        try {
            console.log('in fetchItemById');
            const response = await axios.get(`https://localhost:7106/api/Item/${id}`)
            console.log('item by id', response.data);
            return response.data
        } catch (error) {
            console.log(error.message);
        }

    }
)


export const deleteItem = createAsyncThunk(
    'items/deleteItems',
    async (id, thunkApi) => {
        console.log('in delete category');
        try {
            const response = await axios.delete(`https://localhost:7106/api/Item/${id}`)
            console.log(response);
            // return response.data
            return id;
        } catch (error) {
            console.log(error.message);
        }
    }
)

// export const postItem = createAsyncThunk(
//     'items/postItem',
//     async (c, thunkApi) => {

//         try {
//             const response = await axios.post('https://localhost:7106/api/Item', {
//                 name: c['name'],
//                 description: c['description'],
//                 userId: c['userId'],
//                 categoryId: c['categoryId'],
//                 state: c['state'],
//                 fileImage: c['fileImage'],
//             })
//             console.log(response.data);
//             return response.data
//         }
//         catch (error) {
//             console.log(error.message);
//         }
//     }
// )

export const addProduct = createAsyncThunk(
    'addProduct',
    async (product) => {
        console.log('product', product);
        try {
            const formData = new FormData();

            formData.append('Name', product.Name);
            formData.append('Description', product.Description);
            let user;
            if (product.GiveId) {
                console.log('give');
                // formData.append('GiveId', product.GiveId);
                formData.append('GiveId', sessionStorage.getItem('userId'));
                // user=await axios.get(`https://localhost:7106/api/User/${sessionStorage.getItem('userId')}`)
                // formData.append('Give',user.data)
            }

            else {
                console.log('ask');

                formData.append('AskId', sessionStorage.getItem('userId'));
                console.log('product.Ask', product.Ask);
                // response.data.ask=product.Ask

                // formData.append('AskId', product.AskId);
                // user=await axios.get(`https://localhost:7106/api/User/${sessionStorage.getItem('userId')}`)
                // console.log('user in redux add product',user);
                // formData.append('Ask',user.data)
            }

            formData.append('CategoryId', product.CategoryId);
            formData.append('State', product.State);
            if (product.FileImage)
                formData.append('FileImage', product.FileImage);
            console.log('formData', formData);
            const response = await axios.post(`https://localhost:7106/api/Item`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            let user1 = await axios.get(`https://localhost:7106/api/User/${+sessionStorage.getItem('userId')}`)
            if (product.GiveId)
                response.data.give = user1.data
            else
                response.data.ask = user1.data
            if (product.FileImage) {
                const image = await axios.get(`https://localhost:7106/api/Item/getImage/${response.data.image}`)
                response.data.image = image.data
            }

            console.log('respond7######', response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

// export const putCategory=createAsyncThunk(
//     'categories/putCategories',
//     async(id,thunkApi)=>{
//         console.log('in delete category');
//         const response=await axios.delete('https://localhost:7106/api/Category/'+id)
//         console.log(response);
//         return response.data
//     }
// )

export const updateItem = createAsyncThunk(
    'items/updateItem',
    async (member) => {
        try {
            console.log(member);
            const formData = new FormData();
            formData.append('Name', member.name);
            formData.append('Description', member.description);
            formData.append('CategoryId', member.categoryId);
            formData.append('State', member.state);
            formData.append('fileImage', member.fileImage);
            if (member.askId)
                formData.append('askId', member.askId)
            else
                formData.append('giveId', member.giveId)

            console.log('formData', formData);
            let response = await axios.put(`${apiUrl}/Item/${member.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log('member.id in udate user', member.id);
                let newItem = await axios.get(`https://localhost:7106/api/Item/${member.id}`)
                console.log('newItem', newItem.data);
                return newItem.data
                // member.image= await axios.get(`https://localhost:7106/api/Item/getImage/${member.fileImage.name}`)
                // member.image=member.image.data
                // delete member.fileImage;
                // return member
                // return response.data;
            }
        }
        catch (error) {
            return (error.message);
        }
    });

export const getItemsGiveOfUser = createAsyncThunk(
    'itemsOfUser/getItemsGiveOfUser',
    async (id, thunkAPI) => {
        console.log('in get items of user');
        try {
            const response = await axios.get(`https://localhost:7106/api/Item/GetItemsGiveOfUser/${id}`)
            console.log('response.data', response.data.data);
            console.log("sdfghjkjhgfdsdfghjmjhgfd");
            console.log('response', response);

            return response.data.data
        }
        catch (error) {
            console.log('items of user', error.message);
            // return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const getItemsAskOfUser = createAsyncThunk(
    'itemsOfUser/getItemsAskOfUser',
    async (id, thunkAPI) => {
        console.log('in get items of user');
        try {
            const response = await axios.get(`https://localhost:7106/api/Item/GetItemsAskOfUser/${id}`)
            console.log('response.data', response.data.data);
            console.log("sdfghjkjhgfdsdfghjmjhgfd");
            console.log('response', response);

            return response.data.data
        }
        catch (error) {
            console.log('items of user', error.message);
            // return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.itemsToGive = action.payload.filter(x => x.give !== null)
            state.itemsToAsk = action.payload.filter(x => x.give === null)
            console.log('itemsToGive', state.itemsToGive);
            console.log('itemsToAsk', state.itemsToAsk);
        })
        builder.addCase(deleteItem.pending, (state, action) => {
            state.action = 'pending'
            console.log('status delete',state.action);
        })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.action = 'fulfilled'
                console.log('action.payload', action.payload);
                // console.log('action.payload.id',action.payload.id);
                console.log('arr', state.itemsToGive.map(x => x.id));
                state.itemsToGive = state.itemsToGive.filter(c => c.id !== action.payload)

                console.log('arr after', state.itemsToGive.map(x => x.id));

                state.itemsToAsk = state.itemsToAsk.filter(c => c.id !== action.payload)
                state.itemsGiveOfUser = state.itemsGiveOfUser.filter(c => c.id !== action.payload)
                state.itemsAskOfUser = state.itemsAskOfUser.filter(c => c.id !== action.payload)
                // let i = state.itemsToGive.findIndex(i => i.id == action.payload.id)
                // if (i == -1){
                //     i = state.itemsToAsk.findIndex(i => i.id == action.payload.id)
                //     state.itemsToAsk.splice(i,1)
                //     let j=state.itemsAskOfUser.findIndex(i => i.id == action.payload.id)
                //     state.itemsAskOfUser.splice(i,1)
                // }
                // else{
                //     state.itemsToGive.splice(i,1)
                //     let j=state.itemsGiveOfUser.findIndex(i => i.id == action.payload.id)
                //     state.itemsGiveOfUser.splice(i,1)
                // }



                //state.itemsToGive.splice(state.itemsToGive.findIndex(act))
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.status = 'rejected'
                console.log(action);
            })
        // builder.addCase(postItem.fulfilled, (state, action) => {
        //     state.status = 'fulfilled'
        //     console.log(action.payload);
        //     state.users = action.payload
        // })
        builder.addCase(fetchCategoryById.fulfilled, (state, action) => {
            state.selectedItem = action.payload
        })
        builder.addCase(getItemsGiveOfUser.fulfilled, (state, action) => {
            state.statusItemsGiveOfUser = 'fulfilled'
            state.itemsGiveOfUser = action.payload
        })
        builder.addCase(getItemsAskOfUser.fulfilled, (state, action) => {
            state.statusItemsAskOfUser = 'fulfilled'
            state.itemsAskOfUser = action.payload
        })

        builder.addCase(addProduct.fulfilled, (state, action) => {
            // state.action = 'fulfilled'
            console.log('action.payload', action.payload);
            // console.log('action.payload.id',action.payload.id);
            // state.itemsToGive = state.itemsToGive.filter(c => c.id !== action.payload)
            // state.itemsToAsk = state.itemsToAsk.filter(c => c.id !== action.payload)

            //state.itemsToGive.splice(state.itemsToGive.findIndex(act))
            // state.responses.push(action.payload)
            if (action.payload.giveId) {
                console.log('give');
                state.itemsToGive.push(action.payload)
                state.itemsGiveOfUser.push(action.payload)
            }
            else {
                console.log('ask');
                state.itemsToAsk.push(action.payload)
                state.itemsAskOfUser.push(action.payload)
            }
        })
        builder.addCase(fetchItemById.fulfilled, (state, action) => {
            state.selectedItem = action.payload
        })
        builder.addCase(updateItem.fulfilled, (state, action) => {
            console.log('state.itemsToGive', state.itemsToGive.map(x => x.id));
            console.log('action.payload in update item', action.payload);
            let x = state.itemsToGive.findIndex(x => x.id == action.payload.id)
            console.log('x', x);
            // let item = fetchItemById(action.payload)
            console.log('item in update', action.payload);
            if (x) {
                state.itemsToGive[x] = { ...action.payload }
                let y = state.itemsGiveOfUser.findIndex(x => x.id == action.payload.id)
                state.itemsGiveOfUser[y] = { ...action.payload }
            }
            else {
                console.log('ask');
                let z = state.itemsToAsk.findIndex(x => x.id == action.payload.id)
                state.itemsToAsk[z] = { ...action.payload }
                let y = state.itemsAskOfUser.findIndex(x => x.id === action.payload.id)
                state.itemsAskOfUser[y] = { ...action.payload }
            }
        })
    }
})

export const { } = itemSlice.actions
export default itemSlice.reducer