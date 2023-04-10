import { Project } from 'components/project-list/list'
import { useAsync } from 'hooks/useAsync'
import { useEffect } from 'react'
import { cleanObject, useDebounce } from 'utils'
import { useHttp } from './http'
import { useUrlQueryParams } from './url'

export const useProjects = () => {
  const { run, ...result } = useAsync<Project[]>()
  const [param] = useUrlQueryParams(['name', 'personId'])
  const client = useHttp()
  const debouncedParam = useDebounce(param, 200)
  const fetchProjects = () => client('projects', { data: cleanObject(debouncedParam) })
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects
    })
    // eslint-disable-next-line
  }, [debouncedParam])

  return result
}

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync<Project>()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, { data: params, method: 'PATCH' }))
  }

  return {
    mutate,
    ...asyncResult
  }
}

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync<Project>()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects`, { data: params, method: 'POST' }))
  }

  return {
    mutate,
    ...asyncResult
  }
}
