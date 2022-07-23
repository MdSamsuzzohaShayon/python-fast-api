import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL } from '../../config/keys.js';
import { openModal } from './elementsSlice.js'


const initialCurrentUser = {
    id: null,
    email: null,
    is_active: null,
    is_superuser: null,
    is_verified: null,
    name: null
}

const initialRegisterableUser = {
    name: null,
    email: null,
    password: null,
    password2: null
}
const initialLoginableUser = {
    email: null,
    password: null
}


export const getCurrentUser = createAsyncThunk('user/getCurrentUser', async (user, thunkAPI) => {
    try {
        // curl -X 'GET' \
        // 'http://localhost:8000/users/me' \
        // -H 'accept: application/json' \
        // -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYTM3YjkwZDgtZTQwMC00MGJmLWI3NDEtNGJmYTY5OTU2MjFjIiwiYXVkIjpbImZhc3RhcGktdXNlcnM6YXV0aCJdLCJleHAiOjE2NTg0Mzc5ODh9.GNkWN_BxaBD2uLudf1EQXU4pJDJzCthFQdY7dTduM6g'
        // console.log("Current user");
        const token = localStorage.getItem('token');
        if (!token) window.location.reload();
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await axios.get(`${BACKEND_URL}/users/me`, config);
        if (response.status === 200) {
            // console.log("Response - ",response);
            return response.data;
        }
        return initialCurrentUser;
    } catch (error) {
        console.log(error?.response?.status);
        if (error?.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.reload();
        }
        return initialCurrentUser;
    }
});







// FETCH USER CREDENTIALS
const userSlice = createSlice({
    name: "user",
    initialState: {
        loginableUser: initialLoginableUser,
        registerableUser: initialRegisterableUser,
        currentUsers: initialCurrentUser
    },
    reducers: {
        changeRagisterUser: (state, action) => {
            // console.log("Create user state - ", state);
            // console.log("Create user action - ", action.payload);
            state.registerableUser[action.payload.name] = action.payload.value;
        },
        // CREATE USER 
        // registerUser: (state, action) => {
        //     // console.log("Create user state - ", state);
        //     // console.log("Create user action - ", action);
        //     // ACTION PAYLOAD IS A SINGLE VALUE OF USER INPUT 
        // },
        // DELETE USER 
        changeLoginUser: (state, action) => {
            // SEND DELETE REQUEST TO BACKEND 
            state.loginableUser[action.payload.name] = action.payload.value;
        },


        changeUpdateUser: (state, action) => {
            state.currentUsers[action.payload.name] = action.payload.value
        },

        currentUserChange: (state, action) => {
            state.currentUsers = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.currentUsers = action.payload;
        });
        // builder.addCase(registerNewUser.fulfilled, (state, action) => {
        //     state.registerableUser = action.payload;
        // });
    }
});




const { actions, reducer } = userSlice;

export const { changeLoginUser, changeRagisterUser, changeUpdateUser } = actions;
export default reducer;