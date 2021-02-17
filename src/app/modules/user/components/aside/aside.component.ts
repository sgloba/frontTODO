import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {TasksSandboxService} from '../../modules/todo/services/tasks-sandbox.service';
import {Observable} from 'rxjs';
import {TodoI} from '../../modules/todo/models/app.todo.model';
import {take} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})

export class AsideComponent implements OnInit {

  constructor(
    private tasksSandbox: TasksSandboxService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
  ) {
  }

  @ViewChild(MatSidenav)
  sidenav: MatSidenav;

  @ViewChild('subtaskInput')
  subtaskInput: ElementRef;

  currentSubtask$: Observable<any>;
  currentTodo$: Observable<TodoI>;

  allComplete = false;
  inputValue: any;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.todo !== undefined) {
        this.sidenav?.open();
      } else if (this.sidenav) {
        this.sidenav.close();
        this.tasksSandbox.selectTodo(null);
      }
    });
    this.currentSubtask$ = this.tasksSandbox.currentSubtask$;
    this.currentTodo$ = this.tasksSandbox.currentTodo$;
  }

  sidenavClose(): void {
    this.sidenav.close();
    this.tasksSandbox.selectTodo(null);
    this.route.navigate(['/main/todos/'], { queryParams: { todo: null}, queryParamsHandling: 'merge' } );
  }

  addSubtask(): void {
    if (!this.inputValue) {
      return;
    }
    this.currentTodo$
      .pipe(take(1))
      .subscribe((todo) => {
        this.tasksSandbox.addSubtask(this.inputValue, todo._id);
      });
    this.inputValue = '';
    this.subtaskInput.nativeElement.focus();
  }

  toggleActiveSubtask(id): void {
    this.currentTodo$
      .pipe(take(1))
      .subscribe((todo) => {
        this.tasksSandbox.toggleActiveSubtask(todo._id, id);
      });
  }

  removeSubtask(id): void {
    this.currentTodo$
      .pipe(take(1))
      .subscribe((todo) => {
        this.tasksSandbox.removeSubtask(todo._id, id);
      });
  }

}
