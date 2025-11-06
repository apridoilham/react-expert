import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { asyncPreloadProcess } from './states/authUserSlice'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DetailPage from './pages/DetailPage'
import CreateThreadPage from './pages/CreateThreadPage'
import LeaderboardPage from './pages/LeaderboardPage'

import Navigation from './components/Navigation'
import Loading from './components/Loading'

function App() {
  const { value: authUser, isPreload } = useSelector((state) => state.authUser)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPreloadProcess())
  }, [dispatch])

  if (isPreload) {
    return <Loading />
  }

  return (
    <div className='app-container'>
      <header>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/threads/:threadId' element={<DetailPage />} />
          <Route path='/create-thread' element={<CreateThreadPage />} />
          <Route path='/leaderboard' element={<LeaderboardPage />} />
        </Routes>
      </main>
    </div>
  )
  console.log('ini tes gagal')
}

export default App
