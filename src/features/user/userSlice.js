import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    is_logged_in: localStorage.getItem('user_id') != null,
    user_id : localStorage.getItem('user_id')
}

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        handleLogin: (state, action) => {
            // state.value += action.payload
            state.is_logged_in = true;
            state.user_id = action.payload.id; 
        },
    },
})

// Action creators are generated for each case reducer function
export const { handleLogin } = userSlice.actions

export default userSlice.reducer;