import { useQuery } from 'react-query'
import { Kanban } from 'types'
import { useHttp } from './http'

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp()
  return useQuery(['kanbans', param], () => client('kanbans', { data: param }))
}
