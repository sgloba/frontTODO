import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {TasksSandboxService} from '../../services/tasks-sandbox.service';
import {Observable} from 'rxjs';
import {TodoI} from '../../models/app.todo.model';
import {map, take} from 'rxjs/operators';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})

export class AsideComponent implements OnInit {

  constructor(
    private tasksSandbox: TasksSandboxService
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
    this.tasksSandbox.isTodoSelected$.subscribe((res) => {
      if (res) {
        this.sidenav?.open();
      } else if (!res && this.sidenav) {
        this.sidenavClose();
      }
    });
    this.currentSubtask$ = this.tasksSandbox.currentSubtask$;
    this.currentTodo$ = this.tasksSandbox.currentTodo$;
  }

  sidenavClose(): void {
    this.sidenav.close();
    this.tasksSandbox.selectTodo(null);
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
