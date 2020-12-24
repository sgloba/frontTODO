import {SubtaskI} from "./app.subtask.model";

export interface TodoI  {
  _id: number,
  value: string,
  category: string[],
  subTasks: SubtaskI[],
  timestamp: number,
  isCompleted: boolean
}
