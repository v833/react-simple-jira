import { createSlice } from '@reduxjs/toolkit'

interface State {
  projectModalOpen: boolean
}

const initialState: State = {
  projectModalOpen: false,
}

export const projectListSlice = createSlice({
  name: 'projectList',
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalOpen = true
    },
    closeProjectModal(state) {
      state.projectModalOpen = false
    },
  },
})

export const { openProjectModal, closeProjectModal } = projectListSlice.actions

export default projectListSlice.reducer
