export enum TaskStatuses {
  OPENED = 'Opened',
  IN_PROGRESS = 'In progress',
  CLOSED = 'Closed'
}

export type TTaskStatus = keyof typeof TaskStatuses;

type TEnumTasksKeys = {[key in keyof typeof TaskStatuses]: TTaskStatus};
const keys = Object.keys(TaskStatuses) as TTaskStatus[];
export const TaskStatusesKeys = keys.reduce((result, item: TTaskStatus) => Object.assign(result, { [item]: item }), {}) as TEnumTasksKeys;

export interface ITaskStatus {
  id: string;
  name: string;
}

export enum TaskMode {
  CREATE = 'CREATE',
  VIEW = 'VIEW',
}

export interface ITask {
  readonly id: number | string;
  title: string;
}

export interface ITaskFull {
  readonly id: number
  title: string
  team: string
  due_date: number
  status: TTaskStatus
  description: string
  team_id: string
}

export type TTaskFull = keyof ITaskFull;

type TData<T> = {
  total: number;
  offset: number;
  limit: number;
  data: T[];
}

export interface IState {
  list: TData<ITask>;
}
