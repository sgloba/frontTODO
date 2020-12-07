import { Component, OnInit } from '@angular/core';
import {TodoI} from "src/app/models/app.todo.model";

import { TasksSandboxService } from 'src/app/services/tasks-sandbox.service';
import { faCheck, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import {Observable} from "rxjs";


@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {

  constructor(
    private taskSandbox: TasksSandboxService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.taskSandbox.request()


    this.activatedRoute.queryParams.subscribe((p) => {
      if (p.todos === 'active') {
        this.todos$ = this.taskSandbox.activeTodos$
      } else if (p.todos === 'completed') {
        this.todos$ = this.taskSandbox.completedTodos$
      } else {
        this.todos$ = this.taskSandbox.todos$
      }
    })
  }


  faCheck = faCheck;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  todos$: Observable<TodoI[]>;

  removeTodo(id: number): void {
    this.taskSandbox.remove(id).subscribe(() => {
      this.taskSandbox.request()
    })
  }


  toggleActive(id: number): void {
    this.taskSandbox.toggleActive(id).subscribe(() => {
      this.taskSandbox.request()
    })
  }

  editValue(_id: number, value: string) {
    this.taskSandbox.editValue(_id, value).subscribe(() => {
      this.taskSandbox.request()
    })
  }

}
