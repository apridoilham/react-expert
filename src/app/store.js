import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from '../states/authUserSlice'
import threadsReducer from '../states/threadsSlice'
import threadDetailReducer from '../states/threadDetailSlice'
import leaderboardsReducer from '../states/leaderboardsSlice'
import filterReducer from '../states/filterSlice'
import usersReducer from '../states/usersSlice'

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    filter: filterReducer,
    users: usersReducer,
  },
})
