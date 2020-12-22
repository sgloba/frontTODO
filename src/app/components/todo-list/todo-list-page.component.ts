import {Component, ElementRef, ViewChild, OnInit, Input, OnDestroy} from '@angular/core';
import { TasksSandboxService } from '../../services/tasks-sandbox.service';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TodoI} from "../../models/app.todo.model";
import {takeUntil} from "rxjs/operators";




@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListPageComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();

  constructor(
    private taskSandbox: TasksSandboxService,
    private activatedRoute: ActivatedRoute,
  ) {}

  @ViewChild('todoInput')
  todoInput: ElementRef;

  inputValue: string;

  todos$:  Observable<TodoI[]>;


  ngOnInit(): void {
    this.taskSandbox.requestTodos();

    this.activatedRoute.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((p) => {
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

    if (!value) { return }
    this.taskSandbox.add(value);

    this.inputValue = '';
    this.todoInput.nativeElement.focus();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
