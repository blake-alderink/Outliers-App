import { createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({

    name: 'user',
    initialState: { id: null, username: null, isLoggedIn: false },
    reducers: {
        setUser(state, action) {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.isLoggedIn = true;
        }
    }

})

export const userActions = userSlice.actions;

export default userSlice;