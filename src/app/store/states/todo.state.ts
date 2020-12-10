import { TodoI } from '../../models/app.todo.model';

export interface TodoState {
  todos: ReadonlyArray<TodoI>;
  editingTodoInitialValue: ''
}

