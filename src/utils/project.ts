import { Project } from 'components/project-list/list'
import { useAsync } from 'hooks/useAsync'
import { useEffect } from 'react'
import { cleanObject, useDebounce } from 'utils'
import { useHttp } from './http'

export const useProjects = (param: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>()
  const client = useHttp()
  const debouncedParam = useDebounce(param, 200)
  useEffect(() => {
    run(client('projects', { data: cleanObject(debouncedParam) }))
    // eslint-disable-next-line
  }, [debouncedParam])

  return result
}
