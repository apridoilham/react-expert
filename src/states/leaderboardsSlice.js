import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/api'

export const asyncReceiveLeaderboards = createAsyncThunk(
  'leaderboards/receive',
  async (_, { rejectWithValue }) => {
    try {
      const leaderboards = await api.getLeaderboards()
      return { leaderboards }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncReceiveLeaderboards.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(asyncReceiveLeaderboards.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload.leaderboards
      })
      .addCase(asyncReceiveLeaderboards.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export default leaderboardsSlice.reducer
