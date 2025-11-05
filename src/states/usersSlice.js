import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/api'

export const asyncReceiveUsers = createAsyncThunk(
  'users/receive',
  async (_, { rejectWithValue }) => {
    try {
      const users = await api.getAllUsers()
      return { users }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncReceiveUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(asyncReceiveUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload.users
      })
      .addCase(asyncReceiveUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export default usersSlice.reducer
