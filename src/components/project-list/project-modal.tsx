import { Drawer } from 'antd'
import { useProjectModal } from './util'

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal()
  return (
    <Drawer onClose={close} open={projectModalOpen} width="100%">
      <h1>ProjectModal</h1>
      <button onClick={close}>close</button>
    </Drawer>
  )
}
