import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { act } from 'react-dom/test-utils';
// לכל פריט
// אם הפריט לא שלי
//להציג את מה שאני כתבתי על הפריט הזה ומה שבעל הפריט כתב לי על הפריט הזה
//אם הפריט שלי
// לשלוף כל מה שכתבו לי על הפריט הזה וכל מה שאני כתבתי על הפריט הזה 
// למיין לפי המשתמש שכתב/קיבל 
const initialState = {
    messages: [],
    status: 'idle',
    messagesOwnItem: [],
    statusMessagesOwnItem: 'idle',
    messagesItem: [],
    statusMessagesItem: 'idle'
}

// export const deleteItem = createAsyncThunk(
//     'items/deleteItems',
//     async (id, thunkApi) => {
//         console.log('in delete category');
//         try {
//             const response = await axios.delete(`https://localhost:7106/api/Item/${id}`)
//             console.log(response);
//             // return response.data
//             return id;
//         } catch (error) {
//             console.log(error.message);
//         }
//     }
// )

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
let isMine
export const addMessage = createAsyncThunk(
    'addMessage',
    async (message) => {
        console.log('message', message);
        try {
            isMine = message.isMine
            console.log('isMine', isMine);
            const response = await axios.post(`https://localhost:7106/api/Message`, {
                // senderId: message.senderId,
                senderId: +sessionStorage.getItem('userId'),
                gettingId: message.gettingId,
                content: message.content,
                itemId: message.itemId
            });
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

export const getMessagesOwnItem = createAsyncThunk(
    'messagesOwnItem/getMessagesOwnItem',
    async (itemId, userId, thunkAPI) => {
        console.log('in get messages of own user');
        try {
            const response = await axios.get(`https://localhost:7106/api/Item/${itemId}/${sessionStorage.getItem('userId')}`)
            console.log('response.data', response.data);
            console.log('response', response);
            return response.data
        }
        catch (error) {
            console.log('messages of own user', error.message);
        }
    }
)

export const getMessagesItem = createAsyncThunk(
    'messagesItem/getMessagesItem',
    async (itemId, userId, n, thunkAPI) => {
        console.log('in get messages of user ');

        try {
            const response = await axios.get(`https://localhost:7106/api/Item/${itemId}/${sessionStorage.getItem('userId')}/${0}`)
            console.log('messages response.data', response.data);
            console.log('response', response);
            return response.data
        }
        catch (error) {
            console.log('messages of user', error.message);
        }
    }
)

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {

        // builder.addCase(deleteItem.pending, (state, action) => {
        //     state.action = 'pending'
        // })
        //     .addCase(deleteItem.fulfilled, (state, action) => {
        //         state.action = 'fulfilled'
        //         console.log('action.payload', action.payload);
        //         // console.log('action.payload.id',action.payload.id);
        //         state.itemsToGive = state.itemsToGive.filter(c => c.id !== action.payload)
        //         state.itemsToAsk = state.itemsToAsk.filter(c => c.id !== action.payload)

        //         //state.itemsToGive.splice(state.itemsToGive.findIndex(act))
        //     })
        //     .addCase(deleteItem.rejected, (state, action) => {
        //         state.status = 'rejected'
        //         console.log(action);
        //     })
        // builder.addCase(postItem.fulfilled, (state, action) => {
        //     state.status = 'fulfilled'
        //     console.log(action.payload);
        //     state.users = action.payload
        // })
        builder.addCase(addMessage.fulfilled, (state, action) => {
            console.log('action.payload', action.payload);
            console.log('isMine', isMine);
            if (!isMine) {
                state.messagesItem.push(action.payload)
            }
            else {
                // if (state.messagesOwnItem.length > 0) {
                //    let arrI= state.messagesOwnItem.findIndex(x =>x[0].senderId==action.payload.gettingId)
                //    console.log('arrI',arrI);
                //     if(!arrI){
                //         let newArr=[]
                //         newArr.push(action.payload)
                //         state.messagesOwnItem.push(newArr)
                //     }
                //     else{
                //         //arr.push(action.payload)
                //         let newArr=state.messagesOwnItem[arrI]
                //         newArr.push(action.payload)
                //         //state.messagesOwnItem.splice(arrI,1)
                //     }
                let flag = false
                for (let i = 0; i < state.messagesOwnItem.length; i++) {
                    const element = state.messagesOwnItem[i];
                    if (element[0].senderId == action.payload.gettingId) {
                        element.push(action.payload)
                        flag = true
                    }
                }
                console.log('flag', flag);
                if (!flag) {
                    let arr = []
                    arr.push(action.payload)
                    state.messagesOwnItem.push(arr)
                }
                // }
                // else {
                //     const arr = []
                //     arr.push(action.payload)
                //     state.messagesOwnItem.push(arr)
                // }
            }
        })
        builder.addCase(getMessagesOwnItem.fulfilled, (state, action) => {
            state.statusMessagesOwnItem = 'fulfilled'
            state.messagesOwnItem = action.payload
        })
        builder.addCase(getMessagesItem.fulfilled, (state, action) => {
            state.statusMessagesItem = 'fulfilled'
            state.messagesItem = action.payload
        })
    }
})

export const { } = messageSlice.actions
export default messageSlice.reducer