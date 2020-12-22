export interface TodoI  {
  _id: number,
  value: string,
  subTasks: [
    {
      value: string,
      isCompleted: boolean
    }
  ],
  timestamp: number,
  isCompleted: boolean,
}
