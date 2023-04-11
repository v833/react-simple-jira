import { Epic } from 'components/epic'
import { KanbanScreen } from 'components/kanban'
import { Link, Route, Routes, Navigate } from 'react-router-dom'

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'kanban'} element={<KanbanScreen />} />
        <Route path={'epic'} element={<Epic />} />
        <Route path={'*'} element={<Navigate to={'kanban'} replace={true} />} />
      </Routes>
    </div>
  )
}
