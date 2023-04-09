import { useReducer, useState } from 'react'
import { useMountedRef } from './useMountedRef'

interface State<D> {
  error: Error | null
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null,
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()
  return (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0)
}

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }), {
    ...defaultInitialState,
    ...initialState,
  })
  const safeDispatch = useSafeDispatch(dispatch)
  // eslint-disable-next-line
  const [retry, setRetry] = useState(() => () => {})

  const setData = (data: D) => {
    safeDispatch({
      data,
      stat: 'success',
      error: null,
    })
  }

  const setError = (error: Error) => {
    safeDispatch({
      data: null,
      stat: 'error',
      error,
    })
  }

  const run = async (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据')
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    })
    safeDispatch({ ...state, stat: 'loading' })
    return promise
      .then((data) => {
        setData(data)
        return data
      })
      .catch((err) => {
        setError(err)
        return err
      })
  }

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    retry,
    ...state,
  }
}
