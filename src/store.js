import { configureStore } from '@reduxjs/toolkit'
import vtksReducer from './components/redux/vtksSlice'

export const store = configureStore({
  reducer: {
    vtksData:vtksReducer,
  },
})