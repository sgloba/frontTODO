import {createReducer, on} from '@ngrx/store';

import {
  addTodoSuccess,
  editValueSuccess,
  fetchTodosSuccess,
  removeTodoSuccess, selectTodo,
  setInitialTodoEditingValue, setNewTodoEditingValue,
  toggleActiveSuccess
} from '../actions/todo.actions';
import {TodoState} from '../states/todo.state';

export const initialState: TodoState = {
  items: [],
  editing: {
    initialValue: null,
    newValue: null
  },
  selectedTodoId: null
};

export const todoReducer = createReducer(
  initialState,


  on(addTodoSuccess, (state, {todo}) => ({
    ...state,
    items: [...state.items, todo]
  })),

  on(removeTodoSuccess, (state, {_id}) => ({
    ...state,
    items: state.items.filter((todo) => todo._id !== _id)
  })),

  on(toggleActiveSuccess, (state, {_id}) => ({
    ...state,
    items: state.items.map(
      (item) => item._id === _id ? {...item, isCompleted: !item.isCompleted} : item)
  })),

  on(editValueSuccess, (state, {_id, value}) => ({
    ...state,
    items: state.items.map((item) => item._id === _id ? {...item, value} : item)
  })),

  on(fetchTodosSuccess, (state, {todos}) => ({...state, items: todos})),

  on(setInitialTodoEditingValue, (state, {value}) => {
    return ({
      ...state,
      editing: {
        initialValue: value,
        newValue: value
      }
    });
  }),

  on(setNewTodoEditingValue, (state, {value}) => {
    return ({
      ...state,
      editing: {
        ...state.editing,
        newValue: value
      }
    });
  }),

  on(selectTodo, (state, {_id}) => {
    return ({
      ...state,
      selectedTodoId: _id
    });
  })
);



