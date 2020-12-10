import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { TasksSandboxService } from '../../services/tasks-sandbox.service';
import { Observable } from "rxjs";
import { TodoI } from "../../models/app.todo.model";
import { ActivatedRoute } from "@angular/router";



@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListPageComponent implements OnInit{

  @ViewChild('todoInput')
  todoInput: ElementRef;

  constructor(
    private taskSandbox: TasksSandboxService,
    private activatedRoute: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.taskSandbox.requestTodos()

    this.activatedRoute.queryParams.subscribe((p) => {
      if(p.todos === 'active') {
        this.todos$ = this.taskSandbox.activeTodos$
      } else if(p.todos === 'completed') {
        this.todos$ = this.taskSandbox.completedTodos$
      } else {
        this.todos$ = this.taskSandbox.allTodos$
      }
    })
  }

  inputValue: string;
  todos$: Observable<TodoI[]>;



  addTodo(value: string): void {
    if (!value) return;

    this.taskSandbox.add(value)

    this.inputValue = ''
    this.todoInput.nativeElement.focus()
  }

}
