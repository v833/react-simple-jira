import { useState } from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { useMount } from 'utils'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useProjectModal, useProjectsSearchParams } from './util'
import { ButtonNoPadding, Row } from 'components/lib'

export const ProjectListScreen = () => {
  const [param, setParam] = useProjectsSearchParams()
  const [users, setUsers] = useState([])
  const client = useHttp()
  const { isError, error, isLoading, data: list, retry } = useProjects()
  useMount(() => {
    client('users').then(setUsers)
  })
  const { open } = useProjectModal()
  return (
    <Container>
      <Row between>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type="link">
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {isError ? <Typography.Text type="danger">{error?.message}</Typography.Text> : null}
      <List refresh={retry} loading={isLoading} dataSource={list || []} users={users} />
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`
