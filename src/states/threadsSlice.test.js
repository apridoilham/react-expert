import threadsReducer, {
  asyncReceiveThreads,
  toggleUpvoteThread,
  toggleDownvoteThread,
} from './threadsSlice'

describe('threadsReducer', () => {
  const initialState = {
    list: [],
    status: 'idle',
    error: null,
  }

  it('should return the initial state when passed an empty action', () => {
    const actualState = threadsReducer(undefined, { type: '' })
    expect(actualState).toEqual(initialState)
  })

  it('should handle asyncReceiveThreads.fulfilled', () => {
    const mockThreads = [{ id: 'thread-1', title: 'Test Thread' }]
    const action = {
      type: asyncReceiveThreads.fulfilled.type,
      payload: { threads: mockThreads },
    }
    const actualState = threadsReducer(initialState, action)
    expect(actualState.status).toBe('succeeded')
    expect(actualState.list).toEqual(mockThreads)
  })

  it('should toggle upvote when not upvoted before', () => {
    const state = {
      ...initialState,
      list: [
        { id: 'thread-1', upVotesBy: [], downVotesBy: [], ownerId: 'user-2' },
      ],
    }
    const action = {
      type: toggleUpvoteThread.type,
      payload: { threadId: 'thread-1', authUserId: 'user-1' },
    }
    const actualState = threadsReducer(state, action)
    expect(actualState.list[0].upVotesBy).toContain('user-1')
  })

  it('should remove upvote when already upvoted', () => {
    const state = {
      ...initialState,
      list: [
        {
          id: 'thread-1',
          upVotesBy: ['user-1'],
          downVotesBy: [],
          ownerId: 'user-2',
        },
      ],
    }
    const action = {
      type: toggleUpvoteThread.type,
      payload: { threadId: 'thread-1', authUserId: 'user-1' },
    }
    const actualState = threadsReducer(state, action)
    expect(actualState.list[0].upVotesBy).not.toContain('user-1')
  })

  it('should toggle downvote and remove upvote if exists', () => {
    const state = {
      ...initialState,
      list: [
        {
          id: 'thread-1',
          upVotesBy: ['user-1'],
          downVotesBy: [],
          ownerId: 'user-2',
        },
      ],
    }
    const action = {
      type: toggleDownvoteThread.type,
      payload: { threadId: 'thread-1', authUserId: 'user-1' },
    }
    const actualState = threadsReducer(state, action)
    expect(actualState.list[0].downVotesBy).toContain('user-1')
    expect(actualState.list[0].upVotesBy).not.toContain('user-1')
  })
})