import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import LoginPage from './LoginPage'

// --- PERBAIKAN MOCK DIMULAI ---

// 1. Ambil implementasi asli, GUNAKAN PREFIX 'mock'
const mockActualAuthUserSlice = jest.requireActual('../states/authUserSlice')

// 2. Mock modulnya
jest.mock('../states/authUserSlice', () => ({
  __esModule: true, // <-- Penting untuk ES Modules
  ...mockActualAuthUserSlice, // <-- Gunakan variabel ber-prefix 'mock'
  default: mockActualAuthUserSlice.default, // <-- Gunakan variabel ber-prefix 'mock'
  asyncLoginUser: jest.fn(() => ({ // <-- Timpa HANYA asyncLoginUser
    unwrap: jest.fn(() => Promise.resolve()),
  })),
}))

// 3. Sekarang impor reducer-nya
import authUserReducer from '../states/authUserSlice'

// 4. Buat store dengan reducer yang valid
const mockStore = configureStore({
  reducer: {
    authUser: authUserReducer,
  },
})

// --- PERBAIKAN MOCK SELESAI ---

describe('LoginPage Component', () => {
  beforeEach(() => {
    // Reset mock sebelum setiap tes
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

  it('should dispatch asyncLoginUser on form submit', async () => {
    // Ambil thunk yang sudah di-mock
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
  })
})