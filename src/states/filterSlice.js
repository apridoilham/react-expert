import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    activeCategory: '',
  },
  reducers: {
    setFilterCategory: (state, action) => {
      if (state.activeCategory === action.payload) {
        state.activeCategory = ''
      } else {
        state.activeCategory = action.payload
      }
    },
    clearFilterCategory: (state) => {
      state.activeCategory = ''
    },
  },
})

export const { setFilterCategory, clearFilterCategory } = filterSlice.actions
export default filterSlice.reducer
