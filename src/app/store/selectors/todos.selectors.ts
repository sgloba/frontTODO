import { createSelector } from "@ngrx/store";
import { TodoI } from "../../models/app.todo.model";
import { GlobalStateI } from "../states/global.state";


export const allTodos = createSelector(
  (state: GlobalStateI) => {
    return state.todos.items
  },
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



export const isTodoEditing = createSelector(
  (state: GlobalStateI) => state.todos.editing,
  ({ initialValue, newValue }) => initialValue !== null && newValue !== null
)
export const initialEditingValue = createSelector(
  (state: GlobalStateI) => state.todos.editing.initialValue,
  (initialEditingValue: string) => initialEditingValue
)
export const newEditingValue = createSelector(
  (state: GlobalStateI) => state.todos.editing.newValue,
  (newEditingValue: string) => newEditingValue
)
