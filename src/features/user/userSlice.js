import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    is_logged_in: localStorage.getItem('user_id') != null,
    user_id : localStorage.getItem('user_id') || null,
}

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        handleLogin: (state, action) => {
            console.log(action);
            state.is_logged_in = true;
            state.user_id = action.payload._id;
        },
        handleLogout: (state) => {
            localStorage.removeItem("user_id");
            state.is_logged_in = false;
            state.user_id = null;
        },
    },
})

// Action creators are generated for each case reducer function
export const { handleLogin, handleLogout } = userSlice.actions

export default userSlice.reducer;