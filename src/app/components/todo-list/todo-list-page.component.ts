import {Component, ElementRef, ViewChild, OnInit, Input, OnDestroy} from '@angular/core';
import { TasksSandboxService } from '../../services/tasks-sandbox.service';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {combineAll, filter, map, pairwise, startWith, switchMap, takeUntil, tap} from "rxjs/operators";
import {OptionsI} from "../../models/app.options.model";




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


  ngOnInit(): void {
    this.taskSandbox.requestTodos();
  }


  @ViewChild('todoInput')
  todoInput: ElementRef;

  inputValue: string;

  options: OptionsI[] = [
    {title: 'home', active: true},
    {title: 'work', active: true},
    {title: 'party', active: true},
    {title: 'other', active: true},
  ]


  categoriesSelected$ = new BehaviorSubject(this.options)

  selectedCategories$ = this.categoriesSelected$.pipe(
    map((options) => {
      return options
        .filter(({ active }) => active)     //????
        .map(({ title }) => title)
    })
  );

  selectedStatus$ = this.activatedRoute.queryParams
    .pipe(
      startWith(null),
      pairwise(),
      filter(([prev, current]) => {
        return prev === null || prev?.todos !== current?.todos;
      }),
      map(([, current]) => current?.todos)
    )

  filteredTodos$ = combineLatest([
    this.selectedStatus$,
    this.selectedCategories$
  ]).pipe(
    switchMap(([status, category]) => this.taskSandbox.getFilteredTodos(status, category))
  );




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
