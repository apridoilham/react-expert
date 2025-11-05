import { configureStore } from '@reduxjs/toolkit'
import authUserReducer, {
  asyncLoginUser,
  asyncRegisterUser,
} from './authUserSlice'
import api from '../utils/api'

jest.mock('../utils/api')

const mockStore = configureStore({
  reducer: {
    authUser: authUserReducer,
  },
})

describe('authUserThunks', () => {
  beforeEach(() => {
    api.login.mockClear()
    api.register.mockClear()
    api.getOwnProfile.mockClear()
    api.putAccessToken.mockClear()
  })

  it('should handle successful login (asyncLoginUser)', async () => {
    const mockToken = 'fake-token'
    const mockUser = { id: 'user-1', name: 'Test User' }

    api.login.mockResolvedValue(mockToken)
    api.getOwnProfile.mockResolvedValue(mockUser)

    await mockStore.dispatch(
      asyncLoginUser({ email: 'test@test.com', password: 'password' })
    )

    const state = mockStore.getState().authUser
    expect(state.value).toEqual(mockUser)
    expect(state.status).toBe('succeeded')
    expect(api.login).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'password',
    })
    expect(api.putAccessToken).toHaveBeenCalledWith(mockToken)
    expect(api.getOwnProfile).toHaveBeenCalled()
  })

  it('should handle failed login (asyncLoginUser)', async () => {
    const mockError = 'Login failed'
    api.login.mockRejectedValue(new Error(mockError))

    const result = await mockStore.dispatch(
      asyncLoginUser({ email: 'wrong@test.com', password: 'wrong' })
    )

    const state = mockStore.getState().authUser
    expect(state.value).toBeNull()
    expect(state.status).toBe('failed')
    expect(result.payload).toBe(mockError)
  })

  it('should handle successful register (asyncRegisterUser)', async () => {
    api.register.mockResolvedValue()

    const result = await mockStore.dispatch(
      asyncRegisterUser({
        name: 'New User',
        email: 'new@test.com',
        password: 'password123',
      })
    )

    expect(api.register).toHaveBeenCalledWith({
      name: 'New User',
      email: 'new@test.com',
      password: 'password123',
    })
    expect(result.type).toBe('authUser/register/fulfilled')
  })

  it('should handle failed register (asyncRegisterUser)', async () => {
    const mockError = 'Register failed'
    api.register.mockRejectedValue(new Error(mockError))

    const result = await mockStore.dispatch(
      asyncRegisterUser({
        name: 'New User',
        email: 'new@test.com',
        password: 'password123',
      })
    )

    expect(result.type).toBe('authUser/register/rejected')
    expect(result.payload).toBe(mockError)
  })
})