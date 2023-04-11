import styled from '@emotion/styled'
import { Card } from 'antd'
import { Kanban, Task } from 'types'
import { useTasksType } from 'utils/task'
// import { useTasksSearchParams } from './util'

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: tasks } = useTasksType()
  return (
    <Container>
      <h3>{kanban.name}</h3>
      {tasks?.map((task: Task) => (
        <Card style={{ marginBottom: '0.5rem' }} key={task.id}>
          {task.name}
        </Card>
      ))}
    </Container>
  )
}

const Container = styled.div`
  min-width: 27.5rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  margin-right: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`
