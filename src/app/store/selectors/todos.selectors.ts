import {createFeatureSelector, createSelector} from '@ngrx/store';
import { TodoI } from '../../models/app.todo.model';
import { GlobalStateI } from '../states/global.state';
import {TodoState} from "../states/todo.state";
import {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} from '../reducers/todo.reducer'

const todosState = createFeatureSelector<TodoState>('todos')

export const allTodos = createSelector(
  todosState,
  selectAll
);

export const activeTodos = createSelector(
  allTodos,
  (todos) => todos.filter((todo) => !todo.isCompleted)
);

export const completedTodos = createSelector(
  allTodos,
  (todos) => todos.filter((todo) => todo.isCompleted)
);

export const selectTodoById = createSelector(
  selectEntities,
  (entities, props) => {
    console.log(entities, props.id)
    return entities[props.id]
  }
);


// export const selectedTodoId = createSelector(
//   todosState,
//   ({selectedTodoId}) => selectedTodoId
// )
//
// export const isTodoEditing = createSelector(
//   (state: GlobalStateI) => state.todos.editing,
//   ({ initialValue, newValue }) => initialValue !== null && newValue !== null
// );
// export const initialEditingValue = createSelector(
//   (state: GlobalStateI) => state.todos.editing.initialValue,
//   (initialValue: string) => initialValue
// );
// export const newEditingValue = createSelector(
//   (todosState: TodoState) => todosState.editing.newValue,
//   (newValue: string) => newValue
// );


