import { Form, Input } from 'antd'
import { IdSelect } from 'components/id-select'
import { Project } from './list'

export interface User {
  id: number
  name: string
  email: string
  title: string
  organization: string
  token: string
}
interface SearchPanelProps {
  users: User[]
  param: Pick<Project, 'name' | 'personId'>
  setParam: (param: SearchPanelProps['param']) => void
}
export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: '2rem' }} layout="inline">
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={(e) =>
            setParam({
              ...param,
              name: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <IdSelect
          defaultOptionName="负责人"
          options={users}
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  )
}
