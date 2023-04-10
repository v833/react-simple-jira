import { User } from 'types/User'
import { createSlice } from '@reduxjs/toolkit'
import * as auth from 'auth-provider'
import { AppDispatch, RootState } from 'store'
import { AuthForm, bootstrapUser } from 'context/auth-context'

interface State {
  user: User | null
}

const initialState: State = {
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    }
  }
})

export const { setUser } = authSlice.actions

export const login = (form: AuthForm) => (dispatch: AppDispatch) => {
  return auth.login(form).then((user) => {
    dispatch(setUser(user))
    return user
  })
}

export const register = (form: AuthForm) => (dispatch: AppDispatch) => {
  return auth.register(form).then((user) => {
    dispatch(setUser(user))
    return user
  })
}

export const logout = () => (dispatch: AppDispatch) => {
  return auth.logout().then(() => {
    dispatch(setUser(null))
  })
}

export const bootstrap = () => (dispatch: AppDispatch) => {
  return bootstrapUser().then((user) => {
    dispatch(setUser(user))
    return user
  })
}

export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer
