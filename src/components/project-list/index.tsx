import { useState, useEffect } from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { cleanObject, useDebounce, useMount } from 'utils'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const client = useHttp()
  const debouncedParam = useDebounce(param, 200)
  useEffect(() => {
    client('projects', { data: cleanObject(debouncedParam) }).then(setList)
    // eslint-disable-next-line
  }, [debouncedParam])
  useMount(() => {
    client('users').then(setUsers)
  })
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
