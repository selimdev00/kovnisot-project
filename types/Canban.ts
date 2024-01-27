export type Task = {
  id: number
  title: string
}

export type Stage = {
  id: number
  title: string
  tasks: Task[]
}
