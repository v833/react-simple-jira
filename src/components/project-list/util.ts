import { useMemo } from 'react'
import { useProject } from 'utils/project'
import { useUrlQueryParams } from 'utils/url'

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParams(['name', 'personId'])
  return [
    useMemo(() => {
      return { ...param, personId: Number(param.personId) || 0 }
    }, [param]),
    setParam
  ] as const
}

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParams(['projectCreate'])
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParams(['editingProjectId'])
  const { data: editingProject, isLoading } = useProject(Number(editingProjectId))
  const open = () => setProjectCreate({ projectCreate: true })
  const close = () => {
    setProjectCreate({ projectCreate: undefined })
    setEditingProjectId({ editingProjectId: undefined })
    return
  }
  const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id })
  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  } as const
}
