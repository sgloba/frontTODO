import { TodoI } from '../../models/app.todo.model';
import {EntityState} from "@ngrx/entity";

export interface TodoState extends EntityState<TodoI>{
    selectedTodoId: number,
    selectedCategories: string[]
}


