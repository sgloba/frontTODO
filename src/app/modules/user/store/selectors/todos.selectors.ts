import {createFeatureSelector, createSelector, select} from '@ngrx/store';
import {TodoState} from '../states/todo.state';
import {
  selectEntities,
  selectAll,
} from '../reducers/todo.reducer';

const todosState = createFeatureSelector<TodoState>('todos');

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
  todosState,
  (state, props) => {
    return selectEntities(state)[props.id];
  }
);

export const currentTodoId = createSelector(
  todosState,
  (todos) => todos.selectedTodoId
);

export const isTodoSelected = createSelector(
  currentTodoId,
  (id) => !!id
);

export const currentTodo = createSelector(
  todosState,
  currentTodoId,
  (state, currentTodoId) => state.entities[currentTodoId]
);

export const currentSubtask = createSelector(
  todosState,
  currentTodoId,
  (state, currentTodoId) => state.entities[currentTodoId]?.subTasks
);

export const selectedCategories = createSelector(
  todosState,
  state => state.selectedCategories
);

export const isTodoDisable = (id: number) => createSelector(
  todosState,
  state => {
    return !!state.disabledTodos.filter(item => item === id).length;
  }
);

export const getFilteredTodos = (selectedStatus: string, selectedCategories: string[]) => createSelector(
  allTodos,
  (todos) => {
    const filterByActivity = (status) => (todo) => {
      if (status === 'all') { return true; }
      return todo.isCompleted === (status === 'completed');
    };
    const filterByCategories = (categories) => (todo) => {
      return todo.category.some((category) => categories.includes(category));
    };
    return todos
      .filter(filterByActivity(selectedStatus))
      .filter(filterByCategories(selectedCategories));
  }
);

