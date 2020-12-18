import {TodoState} from '../states/todo.state';
import {TodoI} from "../../models/app.todo.model";


import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as TodoActions from '../actions/todo.actions';
import {toggleActiveTodoSuccess} from "../actions/todo.actions";

export const todosFeatureKey = 'todos';

export interface State extends EntityState<TodoI> {
  // additional entities state properties
}

export const adapter: EntityAdapter<TodoI> = createEntityAdapter<TodoI>({
  selectId: model => model._id
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const todoReducer = createReducer(
  initialState,
  on(TodoActions.fetchTodosSuccess,
    (state, {todos}) => adapter.setAll(todos, state)
  ),
  on(TodoActions.addTodoSuccess,
    (state, { todo }) => adapter.addOne(todo, state)
  ),
  // on(TodoActions.updateTodoSuccess,
  //   (state, {todo}) => adapter.updateOne(todo, state)
  // ),
  //   on(toggleActiveTodoSuccess,
  //     (id) => adapter.updateOne(todo, state)
  //     ),
  // on(TodoActions.removeTodoSuccess,
  //   (state, {_id}) => adapter.removeOne(_id, state)
  // ),
  // on(TodoActions.clearTodos,
  //   state => adapter.removeAll(state)
  // ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();





// export const todoReducer = createReducer(
//   initialState,
//
//
//   on(addTodoSuccess, (state, {todo}) => ({
//     ...state,
//     items: [...state.items, todo]
//   })),
//
//   on(removeTodoSuccess, (state, {_id}) => ({
//     ...state,
//     items: state.items.filter((todo) => todo._id !== _id)
//   })),
//
//   on(toggleActiveSuccess, (state, {_id}) => ({
//     ...state,
//     items: state.items.map(
//       (item) => item._id === _id ? {...item, isCompleted: !item.isCompleted} : item)
//   })),
//
//   on(editValueSuccess, (state, {_id, value}) => ({
//     ...state,
//     items: state.items.map((item) => item._id === _id ? {...item, value} : item)
//   })),
//
//   on(fetchTodosSuccess, (state, {todos}) => ({...state, items: todos})),
//
//   on(setInitialTodoEditingValue, (state, {value}) => {
//     return ({
//       ...state,
//       editing: {
//         initialValue: value,
//         newValue: value
//       }
//     });
//   }),

//   on(setNewTodoEditingValue, (state, {value}) => {
//     return ({
//       ...state,
//       editing: {
//         ...state.editing,
//         newValue: value
//       }
//     });
//   }),
//
//   on(selectTodo, (state, {_id}) => {
//     return ({
//       ...state,
//       selectedTodoId: _id
//     });
//   })
// );



