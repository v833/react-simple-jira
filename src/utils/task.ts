import { useQuery } from 'react-query'
import { Task } from 'types'
import { useHttp } from './http'

export const useTasksType = (param?: Partial<Task>) => {
  const client = useHttp()
  return useQuery(['tasks', param], () => client('tasks', { data: param }))
}

// export const useTaskType = () => {}
