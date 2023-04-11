import styled from '@emotion/styled'
import { Drag, Drop } from 'components/drag-and-drop'
import { useDocumentTitle } from 'hooks/useDocumentTitle'
import { useCallback } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Kanban } from 'types'
import { useKanbans, useReorderKanban } from 'utils/kanban'
import { KanbanColumn } from './kanban-column'
import { useProjectInUrl } from './util'

export const KanbanScreen = () => {
  useDocumentTitle('看板列表')
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans } = useKanbans()
  const onDragEnd = useDropEnd()

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <h1>{currentProject?.name}看板</h1>
        <Drop type="COLUMN" direction="horizontal" droppableId="kanban">
          <ColumnsContainer>
            {kanbans?.map((kanban: Kanban, index: number) => (
              <Drag key={kanban.id} draggableId={'kanban' + kanban.id} index={index}>
                <KanbanColumn key={kanban.id} kanban={kanban}></KanbanColumn>
              </Drag>
            ))}
          </ColumnsContainer>
        </Drop>
      </div>
    </DragDropContext>
  )
}

export const useDropEnd = () => {
  const { data: kanbans } = useKanbans()
  const { mutate: reorderKanban } = useReorderKanban()

  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) return
      if (type === 'COLUMN') {
        const fromId = kanbans?.[source.index].id
        const toId = kanbans?.[destination.index].id
        if (!fromId || !toId || fromId === toId) return
        const type = destination.index > source.index ? 'after' : 'before'
        reorderKanban({ fromId, referenceId: toId, type })
      }
    },
    [kanbans, reorderKanban]
  )
}

const ColumnsContainer = styled.div`
  display: flex;
  margin-right: 2rem;
  overflow: hidden;
`
