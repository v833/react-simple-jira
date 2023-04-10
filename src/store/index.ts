import { configureStore } from '@reduxjs/toolkit'
import projectListReducer from 'components/project-list/project-list.slice'
import authReducer from './auth.slice'

export const rootReducer = {
  projectList: projectListReducer,
  auth: authReducer
}

export const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen
