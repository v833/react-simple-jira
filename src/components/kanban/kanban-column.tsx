import styled from '@emotion/styled'
import { Card } from 'antd'
import { Drag, Drop, DropChild } from 'components/drag-and-drop'
import React from 'react'
import { Kanban, Task } from 'types'
import { useTasksType } from 'utils/task'
// import { useTasksSearchParams } from './util'

export const KanbanColumn = React.forwardRef<HTMLDivElement, { kanban: Kanban }>(
  ({ kanban, ...props }: { kanban: Kanban }, ref) => {
    const { data: tasks } = useTasksType()
    return (
      <Container ref={ref} {...props}>
        <h3>{kanban.name}</h3>
        <Drop type="ROW" direction="vertical" droppableId={'task' + kanban.id}>
          <DropChild>
            {tasks?.map((task: Task, index: number) => (
              <Drag key={task.id} draggableId={'task' + task.id} index={index}>
                <div>
                  <Card style={{ marginBottom: '0.5rem' }} key={task.id}>
                    {task.name}
                  </Card>
                </div>
              </Drag>
            ))}
          </DropChild>
        </Drop>
      </Container>
    )
  }
)
KanbanColumn.displayName = 'KanbanColumn'

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
