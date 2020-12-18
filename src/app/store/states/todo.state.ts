import { TodoI } from '../../models/app.todo.model';

export interface TodoState {
  items: TodoI[];
  editing: {
    initialValue: string,
    newValue: string
  };
  selectedTodoId: number
}

