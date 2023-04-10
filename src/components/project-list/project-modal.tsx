import { Drawer } from 'antd'
import { useDispatch } from 'react-redux'
import { selectProjectModalOpen } from 'store'
import { closeProjectModal } from './project-list.slice'
import { useSelector } from 'react-redux'

export const ProjectModal = () => {
  const dispatch = useDispatch()
  const projectModalOpen = useSelector(selectProjectModalOpen)
  return (
    <Drawer onClose={() => dispatch(closeProjectModal())} open={projectModalOpen} width="100%">
      <h1>ProjectModal</h1>
      <button onClick={() => dispatch(closeProjectModal())}>close</button>
    </Drawer>
  )
}
