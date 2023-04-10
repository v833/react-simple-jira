import styled from '@emotion/styled'
import { Divider, List, Popover, Typography } from 'antd'
import { ButtonNoPadding } from 'components/lib'
import { useProjectModal } from 'components/project-list/util'
import { useProjects } from 'utils/project'
export const ProjectPopover = () => {
  const { data: projects } = useProjects()
  const pinnedProjects = projects?.filter((project) => project.pin)
  const { open } = useProjectModal()

  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding onClick={open} type="link">
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  )
  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
