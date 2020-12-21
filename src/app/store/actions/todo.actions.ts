import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import {TodoI} from '../../models/app.todo.model';


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

export const clearTodos = createAction(
  '[Todos] Clear Todos'
);


export const selectTodo = createAction(
  '[Todos] Select Todo',
  props<{id: number}>()
)


//
// export const addTodo = createAction(
//   '[Todos] Add Todo',
//   props<{value: string}>()
// );
// export const addTodoSuccess = createAction(
//   '[Todos] Add Todo Success',
//   props<{todo: TodoI}>()
// );
//
//
// export const removeTodo = createAction(
//   '[Todos] Remove Todo',
//   props<{_id: number}>()
// );
// export const removeTodoSuccess = createAction(
//   '[Todos] Remove Todo Success',
//   props<{_id: number}>()
// );
//
//
// export const toggleActive = createAction(
//   '[Todos] Toggle Active Todo',
//   props<{_id: number}>()
// );
// export const toggleActiveSuccess = createAction(
//   '[Todos] Toggle Active Todo Success',
//   props<{_id: number}>()
// );
//
//
// export const editValue = createAction(
//   '[Todos] Edit Value',
//   props<{_id: number, value: string }>()
// );
// export const editValueSuccess = createAction(
//   '[Todos] Edit Value Success',
//   props<{_id: number, value: string }>()
// );
//
//
// export const fetchTodos = createAction(
//   '[Todos] Fetch Todos'
// );
// export const fetchTodosSuccess = createAction(
//   '[Todos] Fetch Todos Success',
//   props<{todos: Array<TodoI>}>()
// );
//
//
// export const setInitialTodoEditingValue = createAction(
//   '[Todos] Set Initial Todo Editing Value',
//   props<{value: string}>()
// );
// export const setNewTodoEditingValue = createAction(
//   '[Todo] Set New Todo Editing Value',
//   props<{value: string}>()
// );
// export const resetTodoEditingState = createAction(
//   '[Todo] Reset Todo Editing State'
// );
//
// export const selectTodo =createAction(
//   '[Todos] Select Todo',
//   props<{_id: number}>()
// )
