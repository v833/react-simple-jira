export type Raw = string | number

export interface Kanban {
  id: number
  name: string
  projectId: number
}

export interface Task {
  id: number
  name: string
  kanbanId: number
  processorId: number
  projectId: number
  typeId: number
  epicId: number
  note: string
}

export interface TaskType {
  id: number
  name: string
}
