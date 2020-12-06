import { Component, ElementRef, OnInit } from '@angular/core';

import { TasksSandboxService } from 'src/app/servises/tasks-sandbox.service';
import { faCheck, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  constructor(
    private taskSandbox: TasksSandboxService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  this.activatedRoute.params.subscribe((p) => {
    if (p.id === 'active') {
      this.todos$ = this.taskSandbox.activeTodos$
    } else if(p.id === 'completed') {
      this.todos$ = this.taskSandbox.completedTodos$
    }else {
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

    this.activatedRoute.params.subscribe((p) => console.log(p))
  }

}
