
export interface Task {
    text: string
    status: string,
    level: string,
    id: string
}

export enum Status {
    Done = "done",
    Progress = "progress",
    Todo = "todo"
}