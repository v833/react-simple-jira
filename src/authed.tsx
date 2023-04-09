import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'components/project-list'
import { Button, Dropdown, Menu } from 'antd'
import styled from '@emotion/styled'
import { ButtonNoPadding, Row } from 'components/lib'
import { Navigate, Route, Routes } from 'react-router'
import { ProjectScreen } from 'components/project-screen'
import { useState } from 'react'
import { ProjectModal } from 'components/project-list/project-modal'
import { ProjectPopover } from 'components/project-popover'

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  return (
    <div>
      <PageHeader
        projectButton={
          <ButtonNoPadding onClick={() => setProjectModalOpen(true)} type="link">
            创建项目
          </ButtonNoPadding>
        }
      />
      <Main>
        <Routes>
          <Route
            path={'/projects'}
            element={
              <ProjectListScreen
                projectButton={
                  <ButtonNoPadding onClick={() => setProjectModalOpen(true)} type="link">
                    创建项目
                  </ButtonNoPadding>
                }
              />
            }
          />
          <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
          <Route path={'/'} element={<Navigate to={'/projects'} replace={true} />} />
        </Routes>
      </Main>
      <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </div>
  )
}

const PageHeader = (props: { projectButton: JSX.Element }) => {
  return (
    <Header between>
      <HeaderLeft gap={2}>
        <Button type={'link'} onClick={resetRoute}>
          logo
        </Button>
        <ProjectPopover {...props} />
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

const User = () => {
  const { user, logout } = useAuth()
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="logout">
            <a onClick={logout}>登出</a>
          </Menu.Item>
        </Menu>
      }>
      <a onClick={(e) => e.preventDefault()}>Hi, {user?.name}</a>
    </Dropdown>
  )
}

export const resetRoute = () => (window.location.href = window.location.origin)

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`
const Main = styled.main`
  height: calc(100vh - 6rem);
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``
