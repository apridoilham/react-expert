import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from '../states/authUserSlice'
import LoginPage from './LoginPage'

jest.mock('../states/authUserSlice', () => ({
  ...jest.requireActual('../states/authUserSlice'),
  asyncLoginUser: jest.fn(() => ({
    unwrap: jest.fn(() => Promise.resolve()),
  })),
}))

const mockStore = configureStore({
  reducer: {
    authUser: authUserReducer,
  },
})

describe('LoginPage Component', () => {
  beforeEach(() => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    )
  })

  it('should render login form correctly', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('should handle email input changes', () => {
    const emailInput = screen.getByLabelText(/email/i)
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    expect(emailInput.value).toBe('test@example.com')
  })

  it('should handle password input changes', () => {
    const passwordInput = screen.getByLabelText(/password/i)
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    expect(passwordInput.value).toBe('password123')
  })

  it('should dispatch asyncLoginUser on form submit', async () => {
    const { asyncLoginUser } = require('../states/authUserSlice')

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(loginButton)

    await expect(asyncLoginUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })
})