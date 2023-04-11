import { Project } from 'components/project-list/Project'
import { useProjectsSearchParams } from 'components/project-list/util'
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
}
export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  const [searchParams] = useProjectsSearchParams()
  const queryKey = ['projects', searchParams]

  return useMutation(
    (params: Partial<Project>) => {
      return client(`projects/${params.id}`, { data: params, method: 'PATCH' })
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(queryKey)
      },
      async onMutate(target) {
        const previousItem = queryClient.getQueryData<Project[]>(queryKey)
        // @ts-ignore
        queryClient.setQueryData(queryKey, (old?: Project[]) => {
          return old?.map((project) => (project.id === target.id ? { ...project, ...target } : project))
        })
        return { previousItem }
      },
      onError(error, newItem, context) {
        queryClient.setQueryData(queryKey, context?.previousItem)
      }
    }
  )
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
