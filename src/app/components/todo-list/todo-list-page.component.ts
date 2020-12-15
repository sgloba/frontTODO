import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { TasksSandboxService } from '../../services/tasks-sandbox.service';
import { Observable } from 'rxjs';
import { TodoI } from '../../models/app.todo.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserHttpService} from "../../services/user-http.service";
import {UserI} from "../../models/app.user.model";




@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListPageComponent implements OnInit{

  constructor(
    private taskSandbox: TasksSandboxService,
    private activatedRoute: ActivatedRoute,
    private userHttpService: UserHttpService,
    private route:Router
  ) {}

  @ViewChild('todoInput')
  todoInput: ElementRef;

  inputValue: string;
  todos$: Observable<TodoI[]>;

  isEditing$: Observable<boolean> = this.taskSandbox.isEditing$;

  user: UserI = this.userHttpService.getCurrentUser()

  ngOnInit(): void {
    this.taskSandbox.requestTodos();

    this.activatedRoute.queryParams.subscribe((p) => {
      if (p.todos === 'active') {
        this.todos$ = this.taskSandbox.activeTodos$;
      } else if (p.todos === 'completed') {
        this.todos$ = this.taskSandbox.completedTodos$;
      } else {
        this.todos$ = this.taskSandbox.allTodos$;
      }
    });
  }

  addTodo(value: string): void {
    if (!value) { return; }
    this.taskSandbox.add(value);

    this.inputValue = '';
    this.todoInput.nativeElement.focus();
  }

  logout(): void {
    localStorage.removeItem('currentUser')
    this.route.navigate(['/'])
  }

}
