import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/api'

export const asyncRegisterUser = createAsyncThunk(
  'authUser/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      await api.register({ name, email, password })
      return { error: null }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const asyncLoginUser = createAsyncThunk(
  'authUser/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const token = await api.login({ email, password })
      api.putAccessToken(token)
      const authUser = await api.getOwnProfile()
      return { error: null, authUser }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const asyncPreloadProcess = createAsyncThunk(
  'authUser/preload',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const authUser = await api.getOwnProfile()
      return { error: null, authUser }
    } catch (error) {
      api.putAccessToken('')
      return rejectWithValue(error.message)
    }
  }
)

export const asyncLogoutUser = createAsyncThunk('authUser/logout', async (_, { dispatch }) => {
  api.putAccessToken('')
  dispatch(clearAuthUser())
})

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: {
    value: null,
    status: 'idle',
    error: null,
    isPreload: false,
  },
  reducers: {
    clearAuthUser: (state) => {
      state.value = null
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(asyncRegisterUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(asyncRegisterUser.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(asyncRegisterUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

      .addCase(asyncLoginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(asyncLoginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.value = action.payload.authUser
      })
      .addCase(asyncLoginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

      .addCase(asyncPreloadProcess.pending, (state) => {
        state.status = 'loading'
        state.isPreload = true
      })
      .addCase(asyncPreloadProcess.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.value = action.payload.authUser
        state.isPreload = false
      })
      .addCase(asyncPreloadProcess.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
        state.isPreload = false
      })
  },
})

export const { clearAuthUser } = authUserSlice.actions
export default authUserSlice.reducer
