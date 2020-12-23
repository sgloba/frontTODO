import {TodoI} from "../../models/app.todo.model";


import {createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import * as TodoActions from '../actions/todo.actions';

export const todosFeatureKey = 'todos';


export interface TodoState extends EntityState<TodoI> {
  selectedTodoId: number,
}

export const adapter: EntityAdapter<TodoI> = createEntityAdapter<TodoI>({
  selectId: model => model._id
});

export const initialState: TodoState = adapter.getInitialState({
  selectedTodoId: null
});


export const todoReducer = createReducer(
  initialState,
  on(TodoActions.fetchTodosSuccess,
    (state, {todos}) => adapter.setAll(todos, state)
  ),
  on(TodoActions.addTodoSuccess,
    (state, {todo}) => adapter.addOne(todo, state)
  ),

  on(TodoActions.updateTodoSuccess,
    (state, {id, value}) => adapter.updateOne({id, changes: {value}}, state)
  ),
  on(TodoActions.toggleActiveTodoSuccess,
    (state, {id}) => {
      let todo = state.entities[id]
      return adapter.updateOne({id: id, changes: {isCompleted: !todo.isCompleted}}, state);
    }
  ),
  on(TodoActions.removeTodoSuccess,
    (state, {id}) => adapter.removeOne(id, state)
  ),

  on(TodoActions.selectTodo, (state, {id}) => ({
    ...state,
    selectedTodoId: id
  })),

  //Subtask

  on(TodoActions.addSubtaskSuccess,
    (state, {id, subTasks}) => adapter.updateOne({id, changes: {subTasks}}, state)
  ),
  on(TodoActions.removeSubtaskSuccess,
    (state, {id, subTasks}) => adapter.updateOne({id, changes: {subTasks}}, state)
    ),
  on(TodoActions.toggleActiveSubtaskSuccess,
    (state, {id, subTasks}) => adapter.updateOne({id, changes: {subTasks}}, state)
    )
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

