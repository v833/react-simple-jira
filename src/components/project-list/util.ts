import { useMemo } from 'react'
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
  const open = () => setProjectCreate({ projectCreate: true })
  const close = () => setProjectCreate({ projectCreate: false })
  return { projectModalOpen: projectCreate === 'true', open, close } as const
}
