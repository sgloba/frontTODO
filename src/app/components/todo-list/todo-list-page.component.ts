import {Component, ElementRef, ViewChild} from '@angular/core';
import { TasksSandboxService } from '../../services/tasks-sandbox.service';

@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListPageComponent {

  @ViewChild('todoInput')
  todoInput: ElementRef;

  constructor(
    private taskSandbox: TasksSandboxService,
  ) {
  }

  inputValue: string;


  addTodo(value: string): void {
    if (!value) return;
    this.taskSandbox.add(value)
    this.inputValue = ''
    this.todoInput.nativeElement.focus()
  }

}
