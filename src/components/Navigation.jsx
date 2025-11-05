import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { asyncLogoutUser } from '../states/authUserSlice'

function Navigation() {
  const authUser = useSelector((state) => state.authUser.value)
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(asyncLogoutUser())
  }

  return (
    <nav className='navigation'>
      <div className='nav-links'>
        <Link to='/'>Home</Link>
        <Link to='/leaderboard'>Leaderboard</Link>
      </div>

      <div className='auth-links'>
        {authUser ? (
          <>
            <span>Halo, {authUser.name}</span>
            <button type='button' onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navigation
