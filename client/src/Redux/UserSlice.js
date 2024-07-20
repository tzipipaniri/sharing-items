import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { fetchItems } from './ItemSlice';

const initialState = {
    //users: [],
    status: 'idle',
    user: null,
}

const apiUrl = 'https://localhost:7106/api'

// export const fetchUsers = createAsyncThunk(
//     'users/fetchUsers',
//     async () => {
//         console.log('in fetch categories');
//         try {
//             const response = await axios.get(`https://localhost:7106/api/User`)
//             console.log('response.data', response.data);
//             // if(response.status===200)


//             // else return thunkApi.rejectWithValue('not categories')

//             return response.data
//         }
//         catch (error) {
//             console.log('items', error.message);
//             // return thunkApi.rejectWithValue(error.message)
//         }
//     }
// )

export const getUserById = createAsyncThunk(
    'users/getUserById',
    async (id) => {
        console.log('in fetchCoursesById');
        try {
            const response = await axios.get(`https://localhost:7106/api/User/${id}`)
            console.log('user by id', response.data);
            return response.data
        } catch (error) {
            console.log(error.message);
        }

    }
)

// export const deleteUser=createAsyncThunk(
//     'users/deleteUsers',
//     async(id,thunkApi)=>{
//         console.log('in delete category');
//         const response=await axios.delete(`https://localhost:7106/api/Item/${id}`)
//         console.log(response);
//         return response.data
//     }
// )

export const postUser = createAsyncThunk(
    'users/postUsers',
    async (u, thunkApi) => {
        console.log('in delete category');
        try {
            // const response = await axios.post('https://localhost:7106/api/User', {
            //     firstName: c['firstName'],
            //     lastName: c['lastName'],
            //     userName: c['userName'],
            //     password: c['password'],
            //     email: c['email'],
            //     phone: c['phone'],
            //     area: c['area'],
            //     city: c['city'],
            //     street: c['street'],
            //     dateOfBirth: c['dateOfBirth']

            // })
            // console.log('response', response);
            // return response.data

            const formData = new FormData();
            formData.append('firstName', u.firstName);
            formData.append('lastName', u.lastName);
            formData.append('userName', u.userName);
            formData.append('password', u.password);

            formData.append('email', u.email);
            formData.append('phone', u.phone);
            formData.append('area', u.area);
            formData.append('city', u.city);
            formData.append('street', u.street);
            formData.append('dateOfBirth', u.dateOfBirth);

            if (u.fileImage)
                formData.append('fileImage', u.fileImage);
            console.log('formData',formData);
            const response = await axios.post(`https://localhost:7106/api/User`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('response', response);

            sessionStorage.setItem('userId', response.data.id)
            sessionStorage.setItem('email', response.data.email)
            sessionStorage.setItem('usename', response.data.userName)
            sessionStorage.setItem('password', response.data.password)
            sessionStorage.setItem('phone', response.data.phone)
            sessionStorage.setItem('area', response.data.area)
            sessionStorage.setItem('city', response.data.city)
            sessionStorage.setItem('street', response.data.street)
            
            sessionStorage.setItem('profile', response.data.image)
            sessionStorage.setItem('firstName', response.data.firstName)
            sessionStorage.setItem('lastName', response.data.lastName)
            sessionStorage.setItem('dateOfBearth', response.data.dateOfBearth)

            return response.data;
        } catch (error) {
            console.log('error.message', error.message);
        }

    }
)


// export const updateUser = createAsyncThunk(
//     'users/updateUser',
//     async (c, thunkApi) => {
//         console.log('in update user');
//         try {
//             console.log('u', c);
//             const response = await axios.put(`https://localhost:7106/api/User/${c.id}`, {
//                 firstName: c['firstName'],
//                 lastName: c['lastName'],
//                 userName: c['userName'],
//                 password: c['password'],
//                 email: c['email'],
//                 phone: c['phone'],
//                 area: c['area'],
//                 city: c['city'],
//                 street: c['street'],
//                 dateOfBirth: c['dateOfBirth'],
//                 fileImage: null
//             })
//             console.log(response);
//             // return response.data
//         } catch (error) {
//             console.log(error.message);
//         }

//     }
// )

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (member) => {
        try {
            const formData = new FormData();
            //                 firstName: c['firstName'],
            //                 lastName: c['lastName'],
            //                 userName: c['userName'],
            //                 password: c['password'],
            //                 email: c['email'],
            //                 phone: c['phone'],
            //                 area: c['area'],
            //                 city: c['city'],
            //                 street: c['street'],
            //                 dateOfBirth: c['dateOfBirth'],
            //                 fileImage: null

            formData.append('firstName', member.firstName);
            formData.append('lastName', member.lastName);
            formData.append('userName', member.userName);
            formData.append('password', member.password);
            formData.append('email', member.email);
            formData.append('phone', member.phone);
            formData.append('area', member.area);
            formData.append('city', member.city);
            formData.append('street', member.street);
            formData.append('dateOfBirth', member.dateOfBirth);
            formData.append('fileImage', member.fileImage);
            console.log('formData',formData);
            //https://localhost:7106/api/User/1
            //https://localhost:7106/api/PersonalDetails/1
            let response = await axios.put(`${apiUrl}/User/${+sessionStorage.getItem('userId')}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                sessionStorage.setItem('userId',sessionStorage.getItem('userId'))
                sessionStorage.setItem('email', member.email)
                sessionStorage.setItem('usename', member.userName)
                sessionStorage.setItem('password', member.password)
                sessionStorage.setItem('phone',member.phone)
                sessionStorage.setItem('area',member.area)
                sessionStorage.setItem('city',member.city)
                sessionStorage.setItem('street',member.street)
                console.log('member.fileImage',member.fileImage);
                sessionStorage.setItem('profile',member.fileImage.name)
                sessionStorage.setItem('firstName',member.firstName)
                sessionStorage.setItem('lastName',member.lastName)
                sessionStorage.setItem('dateOfBearth',member.dateOfBearth)

                return response.data;
            }
        }
        catch (error) {
            return (error.message);
        }
    });

export const getUserByUsername = createAsyncThunk(
    'user/getUserByUsername',
    async (username) => {
        try {
            const response = await axios.get(`https://localhost:7106/api/User/user/${username}`);
            return response.data;
        } catch (error) {
            console.error('שגיאה בהבאת משתמש לפי שם משתמש:', error.message);
            throw error; // זרוק שוב את השגיאה לטיפול ב-extraReducers
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        // builder.addCase(fetchUsers.fulfilled, (state, action) => {
        //     state.status = 'fulfilled'
        //     state.users = action.payload
        // })
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.user = action.payload
        })
        // builder.addCase(deleteItem.pending,(state,action)=>{ 
        //     state.action='pending'
        // })
        // .addCase(deleteItem.fulfilled,(state,action)=>{
        //     state.action='fulfilled'
        //     console.log('action.payload',action.payload);
        //     state.items=state.items.filter(c=>c.id!==action.payload.id)
        // })
        // .addCase(deleteItem.rejected,(state,action)=>{
        //     state.status='rejected'
        //     console.log(action);
        // })
        builder.addCase(postUser.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            console.log(action.payload);
            //state.users = action.payload
        })
            .addCase(getUserByUsername.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getUserByUsername.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.user = action.payload;
            })
            .addCase(getUserByUsername.rejected, (state, action) => {
                state.status = 'rejected';
                console.error('הבאת משתמש לפי שם משתמש נכשלה:', action.error.message);
            });
            builder.addCase(updateUser.fulfilled,(state,action)=>{

            })
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer