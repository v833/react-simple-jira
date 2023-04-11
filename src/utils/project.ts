import { Project } from 'components/project-list/list'
// import { useAsync } from 'hooks/useAsync'
// import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { cleanObject, useDebounce } from 'utils'
import { useHttp } from './http'
import { useUrlQueryParams } from './url'

export const useProjects = () => {
  // const { run, ...result } = useAsync<Project[]>()
  const [param] = useUrlQueryParams(['name', 'personId'])
  const client = useHttp()
  const debouncedParam = useDebounce(param, 200)

  return useQuery<Project[], Error>(['project', param], () => client('projects', { data: cleanObject(debouncedParam) }))

  // const fetchProjects = () => client('projects', { data: cleanObject(debouncedParam) })
  // useEffect(() => {
  //   run(fetchProjects(), {
  //     retry: fetchProjects
  //   })
  //   // eslint-disable-next-line
  // }, [debouncedParam])
  // return result
}
export const useEditProject = () => {
  // const { run, ...asyncResult } = useAsync<Project>()
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<Project>) => {
      return client(`projects/${params.id}`, { data: params, method: 'PATCH' })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects')
      }
    }
  )
  // const mutate = (params: Partial<Project>) => {
  //   return run(client(`projects/${params.id}`, { data: params, method: 'PATCH' }))
  // }

  // return {
  //   mutate,
  //   ...asyncResult
  // }
}

export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<Project>) => {
      return client(`projects`, { data: params, method: 'POST' })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects')
      }
    }
  )
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project, Error>(['project', { id }], () => client(`projects/${id}`), {
    // enabled: 是否发送请求
    enabled: Boolean(id)
  })
}
