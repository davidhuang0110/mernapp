// similar with authSlice.js
// 1. set initialState.
// 2. create Slice.
// 3. export
// 4. create thunk function
// 5. create extrareducers, if needed

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new goal
// createAsyncThunk('action name', pass in async function)
export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
    try {
        // get the token, which is in localStorage and is in user state, we can use thunkAPI's to get it.
        const token = thunkAPI.getState().auth.user.token

        // pass the goalData and token
        return await goalService.createGoal(goalData, token)
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get user goals when loading dashboard page
// in "async()", we do not need to pass anything, we just want thunkAPI
export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
    try {
        // get the token, which is in localStorage and is in user state, we can use thunkAPI's to get it.
        const token = thunkAPI.getState().auth.user.token

        // pass the token
        return await goalService.getGoals(token)
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete goal
export const deleteGoal = createAsyncThunk('goals/delete', async (id, thunkAPI) => {
    try {
        // get the token, which is in localStorage and is in user state, we can use thunkAPI's to get it.
        const token = thunkAPI.getState().auth.user.token

        // pass the id and token
        return await goalService.deleteGoal(id, token)
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const goalSlice = createSlice({ 
    name: 'goal',
    initialState,
    reducers: {
        // just want to reset goals array to empty array
        // the different of "reset" between user and goal is because user persists
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true

                // "state.goals" is an array in the state where all goals are stored.
                // The "action.payload" contains the newly created goal returned from the server. 
                // This line adds that new goal to the goals array, updating the state with the new data.
                state.goals.push(action.payload)
            })
            // action will be the message because "return thunkAPI.rejectWithValue(message)"
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // when "delete" request, backend just return the id
                // if we don't use ".filter()", when click delete(X) button, the goal won't go right away, UI still display the goal, untill reload.
                // "action.payload.id": the goal we delete, after clicking delete button(X), the UI only show goals that are not equal to action.payload.id.
                state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = goalSlice.actions
export default goalSlice.reducer