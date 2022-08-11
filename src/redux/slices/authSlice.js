import { createSlice } from '@reduxjs/toolkit'

const EmptyAuthState = {
  jwt: null,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: EmptyAuthState,
  reducers: {
    login: (state, { payload }) => {
      return payload
    },
    logout: () => EmptyAuthState,
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
