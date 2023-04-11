import { useMutation, useQuery } from 'react-query'
import { Kanban } from 'types'
import { useHttp } from './http'

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp()
  return useQuery(['kanbans', param], () => client('kanbans', { data: param }))
}

export interface SortProps {
  fromId: number
  referenceId: number
  type: 'before' | 'after'
}
export const useReorderKanban = () => {
  const client = useHttp()
  return useMutation((params: SortProps) => client(`kanbans/reorder`, { data: params, method: 'POST' }))
}
