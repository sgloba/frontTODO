import {createFeatureSelector, createSelector} from '@ngrx/store';
import { TodoI } from '../../models/app.todo.model';
import { GlobalStateI } from '../states/global.state';
import {TodoState} from "../states/todo.state";

const todosState = createFeatureSelector<TodoState>('todos')

export const allTodos = createSelector(
  todosState,
  (state) => state.items
);

export const activeTodos = createSelector(
  allTodos,
  (todos: Array<TodoI>) => todos.filter((todo) => !todo.isCompleted)
);

export const completedTodos = createSelector(
  allTodos,
  (todos: Array<TodoI>) => todos.filter((todo) => todo.isCompleted)
);

export const selectedTodoId = createSelector(
  todosState,
  ({selectedTodoId}) => selectedTodoId
)

export const isTodoEditing = createSelector(
  (state: GlobalStateI) => state.todos.editing,
  ({ initialValue, newValue }) => initialValue !== null && newValue !== null
);
export const initialEditingValue = createSelector(
  (state: GlobalStateI) => state.todos.editing.initialValue,
  (initialValue: string) => initialValue
);
export const newEditingValue = createSelector(
  (todosState: TodoState) => todosState.editing.newValue,
  (newValue: string) => newValue
);


