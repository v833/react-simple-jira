import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'components/project-list'
import { Button, Dropdown, Menu } from 'antd'
import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { Navigate, Route, Routes } from 'react-router'
import { ProjectScreen } from 'components/project-screen'

export const AuthenticatedApp = () => {
  return (
    <div>
      <PageHeader />
      <Main>
        <Routes>
          <Route path={'/projects'} element={<ProjectListScreen />} />
          <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
          <Route path={'/'} element={<Navigate to={'/projects'} replace={true} />} />
        </Routes>
      </Main>
    </div>
  )
}

const PageHeader = () => {
  const { user, logout } = useAuth()

  return (
    <Header between>
      <HeaderLeft gap={2}>
        <Button type={'link'} onClick={resetRoute}>
          logo
        </Button>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
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
      </HeaderRight>
    </Header>
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
