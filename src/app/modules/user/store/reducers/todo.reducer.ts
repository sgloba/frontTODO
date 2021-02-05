import {TodoI} from '../../models/app.todo.model';
import {createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import * as TodoActions from '../actions/todo.actions';

export interface TodoState extends EntityState<TodoI> {
  selectedTodoId: number;
  selectedCategories: string[];
  disabledTodos: number[];
}

export const adapter: EntityAdapter<TodoI> = createEntityAdapter<TodoI>({
  selectId: model => model._id
});

export const initialState: TodoState = adapter.getInitialState({
  selectedTodoId: null,
  selectedCategories: [],
  disabledTodos: [],
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
      const todo = state.entities[id];
      return adapter.updateOne({id, changes: {isCompleted: !todo.isCompleted}}, state);
    }
  ),
  on(TodoActions.removeTodoSuccess,
    (state, {id}) => adapter.removeOne(id, state)
  ),

  on(TodoActions.selectTodo, (state, {id}) => ({
    ...state,
    selectedTodoId: id
  })),

  on(TodoActions.disableTodo, (state, {id}) => ({
    ...state,
    disabledTodos: [...state.disabledTodos, id]})
    ),
  on(TodoActions.enableTodo, (state, {id}) => ({
      ...state,
      disabledTodos: [...state.disabledTodos.filter(item => item !== id)]
    })
  ),

  // Subtask

  on(TodoActions.addSubtaskSuccess,
    (state, {id, subTasks}) => adapter.updateOne({id, changes: {subTasks}}, state)
  ),
  on(TodoActions.removeSubtaskSuccess,
    (state, {id, subTasks}) => adapter.updateOne({id, changes: {subTasks}}, state)
    ),
  on(TodoActions.toggleActiveSubtaskSuccess,
    (state, {id, subTasks}) => adapter.updateOne({id, changes: {subTasks}}, state)
    ),

  // Categories

  on(TodoActions.selectCategories,
    (state, {categories}) => ({
      ...state,
      selectedCategories: [...categories]
    })
    ),

);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

