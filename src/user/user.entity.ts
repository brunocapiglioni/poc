import { Task } from '../task/task.entity'

export class User {
  constructor(
    public email: string,
    public name: string,
    public tasks: Task[],
    public id?: number,
  ) {}
}