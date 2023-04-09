import { Drawer } from 'antd'

export const ProjectModal = (props: { projectModalOpen: boolean; onClose: () => void }) => {
  return (
    <Drawer onClose={props.onClose} open={props.projectModalOpen} width="100%">
      <h1>ProjectModal</h1>
      <button onClick={props.onClose}>close</button>
    </Drawer>
  )
}
