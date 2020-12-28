import {Component, ElementRef, ViewChild, OnInit, OnDestroy} from '@angular/core';
import { TasksSandboxService } from '../../services/tasks-sandbox.service';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {filter, map, pairwise, startWith, switchMap, takeUntil} from "rxjs/operators";
import {OptionsI} from "../../../appCommon/models/app.options.model";




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
    .pipe(takeUntil(this.unsubscribe$))
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
