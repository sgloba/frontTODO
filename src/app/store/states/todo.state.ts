import { TodoI } from '../../models/app.todo.model';
import {EntityState} from "@ngrx/entity";

export interface TodoState extends EntityState<TodoI>{

}


// export interface TodoState {
//   items: TodoI[];
//   editing: {
//     initialValue: string,
//     newValue: string
//   };
//   selectedTodoId: number
// }

