import { Dropdown, Menu, Table, TableProps } from 'antd'
import { User } from './search-panel'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useEditProject } from 'utils/project'
import { ButtonNoPadding } from 'components/lib'
import { useProjectModal } from './util'

export interface Project {
  id: number
  name: string
  personId: number | undefined
  pin: boolean
  organization: string
  created: number
}
interface ListProps extends TableProps<Project> {
  users: User[]
  refresh?: () => void
  // projectButton: JSX.Element
}
export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject()
  // const { open } = useProjectModal()
  const { startEdit } = useProjectModal()
  const editProject = (id: number) => (pin: boolean) => mutate({ id, pin })

  return (
    <Table
      pagination={false}
      rowKey="id"
      columns={[
        {
          title: <Pin checked disabled />,
          render(value, project) {
            return <Pin checked={project.pin} onCheckedChange={(pin) => mutate({ id: project.id, pin })} />
          }
        },
        {
          title: '名称',
          render(value, project) {
            return <Link to={project.id.toString()}>{project.name}</Link>
          },
          sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
          title: '部门',
          dataIndex: 'organization'
        },
        {
          title: '负责人',
          render: (value, project) => <span>{users.find((user: User) => user.id === project.personId)?.name}</span>
        },
        {
          title: '创建时间',
          render(value, project) {
            return <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : null}</span>
          }
        },
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="edit">
                      <ButtonNoPadding onClick={() => startEdit(project.id)} type="link">
                        编辑
                      </ButtonNoPadding>
                    </Menu.Item>
                    <Menu.Item key="delete">
                      <ButtonNoPadding onClick={() => startEdit(project.id)} type="link">
                        删除
                      </ButtonNoPadding>
                    </Menu.Item>
                  </Menu>
                }>
                <ButtonNoPadding type="link">...</ButtonNoPadding>
              </Dropdown>
            )
          }
        }
      ]}
      {...props}
    />
  )
}
