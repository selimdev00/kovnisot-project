export type StageId = number | string

export type TaskId = number | string

export type Task = {
  id: TaskId
  title: string
  description: string
  created_at: string
  updated_at: string
  stage_id: StageId
}

export type CreateTaskDTO = Omit<
  Task,
  'id' | 'stage_id' | 'created_at' | 'updated_at'
>

export type UpdateTaskDTO = Task

export type Stage = {
  id: StageId
  title: string
  tasks: Task[]
  created_at: string
  updated_at: string
}

export type CreateStageDTO = Omit<
  Stage,
  'id' | 'tasks' | 'created_at' | 'updated_at'
>
