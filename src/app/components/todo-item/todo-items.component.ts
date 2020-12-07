import { Component, OnInit } from '@angular/core';

import { TasksSandboxService } from 'src/app/services/tasks-sandbox.service';
import { faCheck, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';


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

  todos$;

  removeTodo(id: number): void {
    this.taskSandbox.remove(id)
  }


  toggleActive(id: number): void {
    this.taskSandbox.toggleActive(id)
  }

}
