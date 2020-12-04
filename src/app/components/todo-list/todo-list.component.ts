import {Component, ElementRef, ViewChild} from '@angular/core';
import { TasksSandboxService } from '../../servises/tasks-sandbox.service';

import { faCheck, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @ViewChild('todoInput')
  todoInput: ElementRef;

  constructor(
    private taskSandbox: TasksSandboxService
  ) { }

  faCheck = faCheck;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  inputValue: string;

  todos$ = this.taskSandbox.todos$;

  addTodo(value: string): void {
    if (!value) return;
    this.taskSandbox.add(value)
    this.inputValue = ''
    this.todoInput.nativeElement.focus()
  }

  removeTodo(id: number): void {
    this.taskSandbox.remove(id)
  }

  toggleActive(id: number): void {
    this.taskSandbox.toggleActive(id)
  }

}
