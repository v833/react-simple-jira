import styled from '@emotion/styled'
import { useDocumentTitle } from 'hooks/useDocumentTitle'
import { Kanban } from 'types'
import { useKanbans } from 'utils/kanban'
import { KanbanColumn } from './kanban-column'
import { useProjectInUrl } from './util'

export const KanbanScreen = () => {
  useDocumentTitle('看板列表')
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans } = useKanbans()

  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <ColumnsContainer>
        {kanbans?.map((kanban: Kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban}></KanbanColumn>
        ))}
      </ColumnsContainer>
    </div>
  )
}

const ColumnsContainer = styled.div`
  display: flex;
  margin-right: 2rem;
  overflow: hidden;
`
