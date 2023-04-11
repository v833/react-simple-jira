import { QueryKey, useQueryClient } from 'react-query'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useConfig = (queryKey: QueryKey, callback: (target: any, old: any[]) => any[]) => {
  const queryClient = useQueryClient()
  return {
    onSuccess: () => {
      return queryClient.invalidateQueries(queryKey)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async onMutate(target: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const previousItems = queryClient.getQueryData<any[]>(queryKey)
      // @ts-ignore
      queryClient.setQueryData(queryKey, (old: any[]) => {
        return callback(target, old)
        // return old?.map((project) => (project.id === target.id ? { ...project, ...target } : project))
      })
      return { previousItems }
    },
    onError(error, newItem, context) {
      queryClient.setQueryData(queryKey, context?.previousItems)
    }
  }
}

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    return old?.filter((item) => item.id !== target.id)
  })

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    return old?.map((item) => (item.id === target.id ? { ...item, ...target } : item))
  })

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    return [...old, target]
  })
