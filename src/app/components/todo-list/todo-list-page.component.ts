import {Component, ElementRef, ViewChild, OnInit, Input} from '@angular/core';
import { TasksSandboxService } from '../../services/tasks-sandbox.service';
import { Observable } from 'rxjs';
import { TodoI } from '../../models/app.todo.model';
import {ActivatedRoute} from '@angular/router';
import {SidenavService} from "../../services/sidenav.service";
import {Dictionary} from "@ngrx/entity";




@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListPageComponent implements OnInit{

  constructor(
    private taskSandbox: TasksSandboxService,
    private activatedRoute: ActivatedRoute,
    private sidenavService: SidenavService
  ) {}
  @Input('sidenavOpened') sidenavOpened: boolean;

  @ViewChild('todoInput')
  todoInput: ElementRef;

  inputValue: string;

  todos$: any = [];

  isEditing$: Observable<boolean> = this.taskSandbox.isEditing$;


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
      this.todos$.subscribe(a => console.log('!!!', a));
    });
  }

  addTodo(value: string): void {

    if (!value) { return; }
    this.taskSandbox.add(value);

    this.inputValue = '';
    this.todoInput.nativeElement.focus();
  }

}
