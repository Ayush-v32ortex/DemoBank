import { createSlice } from '@reduxjs/toolkit';

// Check if user is already logged in from a previous session
const storedUser = JSON.parse(localStorage.getItem('userInfo') || 'null');

const initialState = {
  user: storedUser ? storedUser.user : null,
  token: storedUser ? storedUser.access_token : null,
  isAuthenticated: !!storedUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.access_token;
      state.isAuthenticated = true;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;