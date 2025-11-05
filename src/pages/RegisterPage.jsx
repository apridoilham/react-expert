import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { asyncRegisterUser } from '../states/authUserSlice'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onRegister = (event) => {
    event.preventDefault()

    dispatch(asyncRegisterUser({ name, email, password }))
      .unwrap()
      .then(() => {
        navigate('/login')
      })
      .catch((error) => {
        alert(`Registrasi gagal: ${error}`)
      })
  }

  return (
    <section className='register-page'>
      <h2>Buat Akun Anda</h2>
      <form className='register-form' onSubmit={onRegister}>
        <label htmlFor='name'>Nama</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Nama Anda'
          required
        />

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
          placeholder='Minimal 6 karakter'
          minLength={6}
          required
        />

        <button type='submit'>Register</button>
      </form>
    </section>
  )
}

export default RegisterPage
