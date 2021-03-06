import { createAction, props } from '@ngrx/store';
import {TodoI} from '../../modules/todo/models/app.todo.model';
import {SubtaskI} from '../../modules/todo/models/app.subtask.model';


export const fetchTodosStart = createAction(
  '[Todos] Load Todos',
);
export const fetchTodosSuccess = createAction(
  '[Todos] Fetch Todos Success',
  props<{todos: Array<TodoI>}>()
);

export const addTodoStart = createAction(
  '[Todos] Add Todo',
  props<{ value: string }>()
);
export const addTodoSuccess = createAction(
  '[Todos] Add Todo Success',
  props<{todo: TodoI}>()
);

export const updateTodoStart = createAction(
  '[Todos] Update Todo',
  props<{id: number, value: string }>()
);
export const updateTodoSuccess = createAction(
  '[Todos] Update Active Todo Success',
  props<{id: number, value: string }>()
);

export const toggleActiveTodoStart = createAction(
  '[Todos] Toggle Active Todo',
  props<{ id: number }>()
);
export const toggleActiveTodoSuccess = createAction(
  '[Todos] Toggle Active Todo Success',
  props<{id: number}>()
);

export const removeTodoStart = createAction(
  '[Todos] Delete Todo',
  props<{ id: number }>()
);
export const removeTodoSuccess = createAction(
  '[Todos] Remove Todo Success',
  props<{id: number}>()
);

export const selectTodo = createAction(
  '[Todos] Select Todo',
  props<{id: number}>()
);

export const disableTodo = createAction(
  '[Todos] Disable Todo',
  props<{id: number}>()
);
export const enableTodo = createAction(
  '[Todos] EnableTodo Todo',
  props<{id: number}>()
);

// Subtask


export const removeSubtaskStart = createAction(
  '[Todos] Delete Subtask',
  props<{id: number, subId: number}>()
);
export const removeSubtaskSuccess = createAction(
  '[Todos] Delete Subtask Success',
  props<{id: number, subTasks: SubtaskI[]}>()
);


export const addSubtaskStart = createAction(
  '[Todos] Add Subtask',
  props<{value: string, id: number}>()
);
export const addSubtaskSuccess = createAction(
  '[Todos] Add Subtask Success',
  props<{id: number, subTasks: SubtaskI[]}>()
);


export const toggleActiveSubtaskStart = createAction(
  '[Todos] Toggle Active Subtask Start',
  props<{id: number, subId: number}>()
);
export const toggleActiveSubtaskSuccess = createAction(
  '[Todos] Toggle Active Subtask Success',
  props<{id: number, subTasks: SubtaskI[]}>()
);

// Category

export const selectCategories = createAction(
  '[Todos] Select Categories',
  props<{ categories: string[] }>()
);

