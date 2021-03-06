import { TodoI } from '../../modules/todo/models/app.todo.model';
import {EntityState} from '@ngrx/entity';

export interface TodoState extends EntityState<TodoI>{
    selectedTodoId: number;
    selectedCategories: string[];
    disabledTodos: number[];
}


