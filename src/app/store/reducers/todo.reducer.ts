import {createReducer, on} from '@ngrx/store';

import {
  addTodoSuccess,
  editValueSuccess,
  fetchTodosSuccess,
  removeTodoSuccess,
  toggleActiveSuccess
} from '../actions/todo.actions';
import { TodoI } from "../../models/app.todo.model";

export const initialState: ReadonlyArray<TodoI> = [];

export const todoReducer = createReducer(
  initialState,

  on(addTodoSuccess, (state, { todo }) => ([...state, todo])),

  on(removeTodoSuccess, (state, { _id }) => state.filter((todo) => todo._id !== _id)),

  on(toggleActiveSuccess, (state, {_id}) => state.map(
    (item) => item._id === _id ? {...item, isCompleted: !item.isCompleted} : item )),

  on(editValueSuccess, (state, {_id, value}) => state.map(
    (item) => item._id === _id ? {...item, value: value} : item )),

  on(fetchTodosSuccess, (state, {todos: todos}) =>  todos )
);



