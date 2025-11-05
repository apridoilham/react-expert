import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/api'

export const asyncReceiveThreads = createAsyncThunk(
  'threads/receive',
  async (_, { rejectWithValue }) => {
    try {
      const threads = await api.getAllThreads()
      return { threads }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const asyncCreateThread = createAsyncThunk(
  'threads/create',
  async ({ title, body, category }, { dispatch, rejectWithValue }) => {
    try {
      const thread = await api.createThread({ title, body, category })
      dispatch(addThread(thread))
      return { thread }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const asyncToggleUpvoteThread = createAsyncThunk(
  'threads/toggleUpvote',
  async ({ threadId, authUserId }, { dispatch, getState, rejectWithValue }) => {
    const { threads } = getState()
    const thread = threads.list.find((t) => t.id === threadId)

    dispatch(toggleUpvoteThread({ threadId, authUserId }))

    try {
      if (thread.upVotesBy.includes(authUserId)) {
        await api.neutralizeThreadVote(threadId)
      } else {
        await api.upVoteThread(threadId)
      }
    } catch (error) {
      dispatch(toggleUpvoteThread({ threadId, authUserId }))
      return rejectWithValue(error.message)
    }
  }
)

export const asyncToggleDownvoteThread = createAsyncThunk(
  'threads/toggleDownvote',
  async ({ threadId, authUserId }, { dispatch, getState, rejectWithValue }) => {
    const { threads } = getState()
    const thread = threads.list.find((t) => t.id === threadId)
    dispatch(toggleDownvoteThread({ threadId, authUserId }))

    try {
      if (thread.downVotesBy.includes(authUserId)) {
        await api.neutralizeThreadVote(threadId)
      } else {
        await api.downVoteThread(threadId)
      }
    } catch (error) {
      dispatch(toggleDownvoteThread({ threadId, authUserId }))
      return rejectWithValue(error.message)
    }
  }
)

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addThread: (state, action) => {
      state.list.unshift(action.payload)
    },

    toggleUpvoteThread: (state, action) => {
      const { threadId, authUserId } = action.payload
      const thread = state.list.find((t) => t.id === threadId)
      if (thread) {
        const isUpvoted = thread.upVotesBy.includes(authUserId)
        const isDownvoted = thread.downVotesBy.includes(authUserId)

        if (isUpvoted) {
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== authUserId)
        } else {
          thread.upVotesBy.push(authUserId)
          if (isDownvoted) {
            thread.downVotesBy = thread.downVotesBy.filter((id) => id !== authUserId)
          }
        }
      }
    },
    toggleDownvoteThread: (state, action) => {
      const { threadId, authUserId } = action.payload
      const thread = state.list.find((t) => t.id === threadId)
      if (thread) {
        const isUpvoted = thread.upVotesBy.includes(authUserId)
        const isDownvoted = thread.downVotesBy.includes(authUserId)

        if (isDownvoted) {
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== authUserId)
        } else {
          thread.downVotesBy.push(authUserId)
          if (isUpvoted) {
            thread.upVotesBy = thread.upVotesBy.filter((id) => id !== authUserId)
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(asyncReceiveThreads.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(asyncReceiveThreads.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload.threads
      })
      .addCase(asyncReceiveThreads.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

      .addCase(asyncCreateThread.rejected, (state, action) => {
        state.error = action.payload
        alert(`Error: ${action.payload}`)
      })

      .addCase(asyncToggleUpvoteThread.rejected, (state, action) => {
        state.error = action.payload
        alert(`Gagal upvote: ${action.payload}`)
      })
      .addCase(asyncToggleDownvoteThread.rejected, (state, action) => {
        state.error = action.payload
        alert(`Gagal downvote: ${action.payload}`)
      })
  },
})

export const { addThread, toggleUpvoteThread, toggleDownvoteThread } = threadsSlice.actions

export default threadsSlice.reducer
