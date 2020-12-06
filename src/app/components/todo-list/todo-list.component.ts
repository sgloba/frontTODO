import {Component, ElementRef, ViewChild} from '@angular/core';
import { TasksSandboxService } from '../../servises/tasks-sandbox.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @ViewChild('todoInput')
  todoInput: ElementRef;

  constructor(
    private taskSandbox: TasksSandboxService,
    private activatedRoute: ActivatedRoute
  ) { }

  inputValue: string;

  todos$ = this.taskSandbox.todos$;

  addTodo(value: string): void {
    if (!value) return;
    this.taskSandbox.add(value)
    this.inputValue = ''
    this.todoInput.nativeElement.focus()
  }

}
