import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/api'

export const asyncReceiveThreadDetail = createAsyncThunk(
  'threadDetail/receive',
  async (threadId, { rejectWithValue }) => {
    try {
      const threadDetail = await api.getThreadDetail(threadId)
      return { threadDetail }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const asyncCreateComment = createAsyncThunk(
  'threadDetail/createComment',
  async ({ threadId, content }, { dispatch, rejectWithValue }) => {
    try {
      const comment = await api.createComment({ threadId, content })
      dispatch(addComment(comment))
      return { comment }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const asyncToggleUpvoteThreadDetail = createAsyncThunk(
  'threadDetail/toggleUpvoteThread',
  async (authUserId, { dispatch, getState, rejectWithValue }) => {
    const { threadDetail } = getState()
    const { id: threadId } = threadDetail.value

    dispatch(toggleUpvoteThreadDetail(authUserId))
    try {
      if (threadDetail.value.upVotesBy.includes(authUserId)) {
        await api.neutralizeThreadVote(threadId)
      } else {
        await api.upVoteThread(threadId)
      }
    } catch (error) {
      dispatch(toggleUpvoteThreadDetail(authUserId))
      return rejectWithValue(error.message)
    }
  }
)

export const asyncToggleDownvoteThreadDetail = createAsyncThunk(
  'threadDetail/toggleDownvoteThread',
  async (authUserId, { dispatch, getState, rejectWithValue }) => {
    const { threadDetail } = getState()
    const { id: threadId } = threadDetail.value

    dispatch(toggleDownvoteThreadDetail(authUserId))
    try {
      if (threadDetail.value.downVotesBy.includes(authUserId)) {
        await api.neutralizeThreadVote(threadId)
      } else {
        await api.downVoteThread(threadId)
      }
    } catch (error) {
      dispatch(toggleDownvoteThreadDetail(authUserId))
      return rejectWithValue(error.message)
    }
  }
)

export const asyncToggleUpvoteComment = createAsyncThunk(
  'threadDetail/toggleUpvoteComment',
  async ({ commentId, authUserId }, { dispatch, getState, rejectWithValue }) => {
    const { threadDetail } = getState()
    const { id: threadId } = threadDetail.value
    const comment = threadDetail.value.comments.find((c) => c.id === commentId)

    dispatch(toggleUpvoteComment({ commentId, authUserId }))
    try {
      if (comment.upVotesBy.includes(authUserId)) {
        await api.neutralizeCommentVote(threadId, commentId)
      } else {
        await api.upVoteComment(threadId, commentId)
      }
    } catch (error) {
      dispatch(toggleUpvoteComment({ commentId, authUserId }))
      return rejectWithValue(error.message)
    }
  }
)

export const asyncToggleDownvoteComment = createAsyncThunk(
  'threadDetail/toggleDownvoteComment',
  async ({ commentId, authUserId }, { dispatch, getState, rejectWithValue }) => {
    const { threadDetail } = getState()
    const { id: threadId } = threadDetail.value
    const comment = threadDetail.value.comments.find((c) => c.id === commentId)

    dispatch(toggleDownvoteComment({ commentId, authUserId }))
    try {
      if (comment.downVotesBy.includes(authUserId)) {
        await api.neutralizeCommentVote(threadId, commentId)
      } else {
        await api.downVoteComment(threadId, commentId)
      }
    } catch (error) {
      dispatch(toggleDownvoteComment({ commentId, authUserId }))
      return rejectWithValue(error.message)
    }
  }
)

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: {
    value: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    addComment: (state, action) => {
      if (state.value) {
        state.value.comments.unshift(action.payload)
      }
    },

    toggleUpvoteThreadDetail: (state, action) => {
      const authUserId = action.payload
      const isUpvoted = state.value.upVotesBy.includes(authUserId)
      const isDownvoted = state.value.downVotesBy.includes(authUserId)

      if (isUpvoted) {
        state.value.upVotesBy = state.value.upVotesBy.filter((id) => id !== authUserId)
      } else {
        state.value.upVotesBy.push(authUserId)
        if (isDownvoted) {
          state.value.downVotesBy = state.value.downVotesBy.filter((id) => id !== authUserId)
        }
      }
    },
    toggleDownvoteThreadDetail: (state, action) => {
      const authUserId = action.payload
      const isUpvoted = state.value.upVotesBy.includes(authUserId)
      const isDownvoted = state.value.downVotesBy.includes(authUserId)

      if (isDownvoted) {
        state.value.downVotesBy = state.value.downVotesBy.filter((id) => id !== authUserId)
      } else {
        state.value.downVotesBy.push(authUserId)
        if (isUpvoted) {
          state.value.upVotesBy = state.value.upVotesBy.filter((id) => id !== authUserId)
        }
      }
    },

    toggleUpvoteComment: (state, action) => {
      const { commentId, authUserId } = action.payload
      const comment = state.value.comments.find((c) => c.id === commentId)
      if (comment) {
        const isUpvoted = comment.upVotesBy.includes(authUserId)
        const isDownvoted = comment.downVotesBy.includes(authUserId)

        if (isUpvoted) {
          comment.upVotesBy = comment.upVotesBy.filter((id) => id !== authUserId)
        } else {
          comment.upVotesBy.push(authUserId)
          if (isDownvoted) {
            comment.downVotesBy = comment.downVotesBy.filter((id) => id !== authUserId)
          }
        }
      }
    },
    toggleDownvoteComment: (state, action) => {
      const { commentId, authUserId } = action.payload
      const comment = state.value.comments.find((c) => c.id === commentId)
      if (comment) {
        const isUpvoted = comment.upVotesBy.includes(authUserId)
        const isDownvoted = comment.downVotesBy.includes(authUserId)

        if (isDownvoted) {
          comment.downVotesBy = comment.downVotesBy.filter((id) => id !== authUserId)
        } else {
          comment.downVotesBy.push(authUserId)
          if (isUpvoted) {
            comment.upVotesBy = comment.upVotesBy.filter((id) => id !== authUserId)
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncReceiveThreadDetail.pending, (state) => {
        state.status = 'loading'
        state.value = null
      })
      .addCase(asyncReceiveThreadDetail.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.value = action.payload.threadDetail
      })
      .addCase(asyncReceiveThreadDetail.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(asyncCreateComment.rejected, (state, action) => {
        state.error = action.payload
        alert(`Error: ${action.payload}`)
      })
      .addCase(asyncToggleUpvoteThreadDetail.rejected, (state, action) => {
        alert(`Gagal upvote thread: ${action.payload}`)
      })
      .addCase(asyncToggleDownvoteThreadDetail.rejected, (state, action) => {
        alert(`Gagal downvote thread: ${action.payload}`)
      })
      .addCase(asyncToggleUpvoteComment.rejected, (state, action) => {
        alert(`Gagal upvote komentar: ${action.payload}`)
      })
      .addCase(asyncToggleDownvoteComment.rejected, (state, action) => {
        alert(`Gagal downvote komentar: ${action.payload}`)
      })
  },
})

export const {
  addComment,
  toggleUpvoteThreadDetail,
  toggleDownvoteThreadDetail,
  toggleUpvoteComment,
  toggleDownvoteComment,
} = threadDetailSlice.actions

export default threadDetailSlice.reducer
