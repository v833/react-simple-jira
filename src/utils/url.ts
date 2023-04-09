import { useMemo } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject } from 'utils'

export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  return [
    useMemo(() => {
      return keys.reduce((prev, key) => {
        return { ...prev, [key]: searchParams.get(key) || '' }
      }, {} as { [key in K]: string })
      // eslint-disable-next-line
    }, [searchParams]),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
      return setSearchParams(o)
    },
  ] as const
}
