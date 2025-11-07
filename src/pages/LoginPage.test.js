// Paksa CI untuk berjalan ulang
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom' // <-- useNavigate DIHAPUS DARI SINI
import { configureStore } from '@reduxjs/toolkit'
import LoginPage from './LoginPage'

// --- MOCK react-router-dom ---
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate, // <-- Mock ini akan tetap berfungsi
}))
// --- END MOCK ---

// --- MOCK authUserSlice ---
jest.mock('../states/authUserSlice', () => ({
  __esModule: true,
  ...jest.requireActual('../states/authUserSlice'),
  default: jest.requireActual('../states/authUserSlice').default,
  asyncLoginUser: jest.fn((payload) => (dispatch, getState) => {
    const promise = Promise.resolve({})
    promise.unwrap = () => Promise.resolve({})
    return promise
  }),
}))
// --- END MOCK ---

import authUserReducer from '../states/authUserSlice'

const mockStore = configureStore({
  reducer: {
    authUser: authUserReducer,
  },
})

describe('LoginPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
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
    fireEvent.change(passwordInput, { target: { value: 'password10' } })
    expect(passwordInput.value).toBe('password10')
  })

  it('should dispatch asyncLoginUser and navigate on form submit', async () => {
    const { asyncLoginUser } = require('../states/authUserSlice')

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password10' } })
    fireEvent.click(loginButton)

    await expect(asyncLoginUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password10',
    })

    const { waitFor } = require('@testing-library/react')
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })
})