import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice';

export const store = configureStore({
  reducer: {
    // root reducer
    auth: authReducer,
    // if we want to use the state in "authReducer", we can type "state.auth"
    goals: goalReducer,
  },
});
