import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localstorage
// Local storage can only have strings, so use "parse"(解析)
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register user
// The function that handles asynchronous events in Redux is called "thunk"
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try {
        // authService.js
        return await authService.register(user)
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Login user
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    try {
        // authService.js
        return await authService.login(user)
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

// export reducer function
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {     // synchronous
        reset: (state) => {             // used to reset the state to default value after submit button(register)
            state.isLoading = false
            state.isSuccess = false
            state.sError = false
            state.message = ''
        }
    },
    // asynchronous
    extraReducers: (builder) => {       // when we make a register, we need to account for the pending state
                                        // fulfilled everything if everything goes okay, rejected if there's an error
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer