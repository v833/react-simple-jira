import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'components/project-list'
import { Dropdown, Menu } from 'antd'
import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { userInfo } from 'os'

export const AuthenticatedApp = () => {
  const { user, logout } = useAuth()

  return (
    <div>
      <Header between>
        <HeaderLeft gap={2}>
          <h2>Logo</h2>
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
      <Main>
        <ProjectListScreen />
      </Main>
    </div>
  )
}

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`
const Main = styled.main`
  height: calc(100vh - 6rem);
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``
