import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { asyncLoginUser } from '../states/authUserSlice'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogin = (event) => {
    event.preventDefault()

    dispatch(asyncLoginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        alert(`Login gagal: ${error}`)
      })
  }

  return (
    <section className='login-page'>
      <h2>Login ke Akun Anda</h2>
      <form className='login-form' onSubmit={onLogin}>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='email@example.com'
          required
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password Anda'
          required
        />

        <button type='submit'>Login</button>
      </form>
    </section>
  )
}

export default LoginPage
