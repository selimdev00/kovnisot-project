export type Task = {
  id: string
  title: string
  description?: string
  created_at?: string
  updated_at?: string
  stage_id?: number
}

export type Stage = {
  id: number
  title: string
  tasks: Task[]
  created_at?: string
  updated_at?: string
}
