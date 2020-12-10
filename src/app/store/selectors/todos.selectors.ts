import { TodoState } from '../states/todo.state';
import { createSelector } from "@ngrx/store";
import { TodoI } from "../../models/app.todo.model";

export const allTodos = createSelector(
  (state: TodoState) => state.todos,
  (todos: Array<TodoI>) => todos,
);

export const activeTodos = createSelector(
  allTodos,
  (todos: Array<TodoI>) => todos.filter((todo) => !todo.isCompleted)
);

export const completedTodos = createSelector(
  allTodos,
  (todos: Array<TodoI>) => todos.filter((todo) => todo.isCompleted)
);
