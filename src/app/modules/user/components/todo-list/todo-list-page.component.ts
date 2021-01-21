import {Component, ElementRef, ViewChild, OnInit, OnDestroy, HostListener} from '@angular/core';
import {TasksSandboxService} from '../../services/tasks-sandbox.service';
import {BehaviorSubject, combineLatest, fromEvent, Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {filter, map, pairwise, startWith, switchMap, takeUntil} from 'rxjs/operators';
import {OptionsI} from '../../../appCommon/models/app.options.model';
import {MatMenuTrigger} from '@angular/material/menu';



@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListPageComponent implements OnInit, OnDestroy {



  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    if (this.matMenuTrigger.menuOpen) {
      event.preventDefault();
      if ((event.target as HTMLElement).classList.contains('cdk-overlay-backdrop')) {
        this.matMenuTrigger.closeMenu();
      }
    }
  }



  constructor(
    private taskSandbox: TasksSandboxService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.taskSandbox.requestTodos();
    fromEvent(document, 'wheel', { passive: false })
      .pipe(
        filter(() => this.matMenuTrigger.menuOpen),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((e) => e.preventDefault());
  }
  unsubscribe$ = new Subject<void>();

  @ViewChild(MatMenuTrigger)
  matMenuTrigger: MatMenuTrigger;

  @ViewChild('todoInput')
  todoInput: ElementRef;


  inputValue: string;
  showRecycleBin = false;
  highlightRecycleBin = false;
  menuTopLeftPosition = {x: '0', y: '0'};


  options: OptionsI[] = [
    {title: 'home', active: true},
    {title: 'work', active: true},
    {title: 'party', active: true},
    {title: 'other', active: true},
  ];


  categoriesSelected$ = new BehaviorSubject(this.options);

  selectedCategories$ = this.categoriesSelected$.pipe(
    map((options) => {
      return options
        .filter(({active}) => active)     // ????
        .map(({title}) => title);

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
    );

  filteredTodos$ = combineLatest([
    this.selectedStatus$,
    this.selectedCategories$
  ]).pipe(
    switchMap(([status, category]) => this.taskSandbox.getFilteredTodos(status, category))
  );

  addTodo(value: string): void {
    if (!value) {
      return;
      }
      this.taskSandbox.add(value);

      this.inputValue = '';
      this.todoInput.nativeElement.focus();
    }
  onDrop(e) {
    if (e.isPointerOverContainer) {
      this.taskSandbox.remove(e.previousContainer.data._id);
    }
  }
  onDragStart() {
    this.showRecycleBin = true;

  }
  onDragEnd() {
    this.showRecycleBin = false;
  }

  onTodoRightClick(event, todo) {
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';
    this.matMenuTrigger.menuData = {todo};
    this.matMenuTrigger.openMenu();
  }

  removeTodo(id: number) {
    this.taskSandbox.remove(id);
  }



  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
